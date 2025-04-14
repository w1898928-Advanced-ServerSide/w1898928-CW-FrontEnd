export class ApiKeyDto {
    constructor({
      apiId,
      userId,
      apiKey,
      expiresAt,
      attempts,
      isActive,
      createdAt,
      updatedAt,
    }) {
      this.apiId = apiId;
      this.userId = userId;
      this.apiKey = apiKey;
      this.expiresAt = new Date(expiresAt);
      this.attempts = attempts;
      this.isActive = isActive === 1 || isActive === true;
      this.createdAt = new Date(createdAt);
      this.updatedAt = new Date(updatedAt);
    }
  }
  