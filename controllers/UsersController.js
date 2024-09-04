import { ObjectId } from 'mongodb';
import sha1 from 'sha1';
import Queue from 'bull';
import dbClient from '../utils/db';
import userUtils from '../utils/user';

const userQueue = new Queue('userQueue');

class UsersController {
  static async postNew(request, response) {
    const { email, password } = request.body;

    // Validate request data
    if (!email) return response.status(400).send({ error: 'Missing email' });
    if (!password) return response.status(400).send({ error: 'Missing Password' });

    // Check if the email already exists
    const emailExist = await dbClient.usersCollection.findOne({ email });
    if (emailExist) return response.status(400).send({ error: 'Already exist' });

    // Hash the password
    const sha1Password = sha1(password);
    
    let result;
    try {
      // Insert the new user into the database
      result = await dbClient.usersCollection.insertOne({
        email,
        password: sha1Password,
      });
    } catch (err) {
      // Log the error (optional)
      console.error('Error creating user:', err);
      
      // Return an error response if the user creation fails
      return response.status(500).send({ error: 'Error creating user.' });
    }

    // Prepare the user object for the response
    const user = {
      id: result.insertedId.toString(),
      email,
    };

    // Add a job to the userQueue with the userId
    await userQueue.add({
      userId: user.id,
    });

    // Return the newly created user as the response
    return response.status(201).send(user);
  }
}

export default UsersController;
