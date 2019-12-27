import { create } from 'apisauce'
import { Config } from '../Config'


/**
 * This is an example of a service that connects to a 3rd party API.
 *
 * Feel free to remove this example from your application.
 */

const apiClient = create({
  /**
   * Import the config from the App/Config/index.js file
   */
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10 * 1000,
})

let fulfilled = (response) => response

function createUser(email, username, token) {
  return apiClient.post(`/createUser`, {email, username, token}).then(fulfilled)
}

export const authService = {
  createUser
}
