export class UserDto {
  constructor(id, username, email, createdAt, apiKeys = []) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.createdAt = new Date(createdAt);
    this.apiKeys = apiKeys;
  }
}