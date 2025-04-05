import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'LeetBattle API',
      version: '1.0.0',
      description: 'API documentation for LeetBattle platform',
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            auth0Id: { type: 'string', description: 'Auth0 ID' },
            name: { type: 'string', description: 'User name' },
            email: { type: 'string', description: 'User email' },
            score: { type: 'number', description: 'User score' },
            avatar: { type: 'string', description: 'Avatar URL' }
          }
        },
        Problem: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            difficulty: { type: 'string', enum: ['Easy', 'Medium', 'Hard'] },
            acceptance: { type: 'number' },
            category: { type: 'string' }
          }
        },
        BattleRoom: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            creatorId: { type: 'string' },
            difficulties: { type: 'array', items: { type: 'string' } }
          }
        }
      }
    },
    paths: {
      '/users': {
        get: {
          tags: ['Users'],
          summary: 'Get all users',
          responses: {
            200: {
              description: 'List of users',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/User' }
                  }
                }
              }
            }
          }
        }
      },
      '/problems': {
        get: {
          tags: ['Problems'],
          summary: 'Get all problems',
          responses: {
            200: {
              description: 'List of problems',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Problem' }
                  }
                }
              }
            }
          }
        }
      },
      '/battle-rooms': {
        get: {
          tags: ['Battle Rooms'],
          summary: 'Get all battle rooms',
          responses: {
            200: {
              description: 'List of battle rooms',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/BattleRoom' }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  apis: ['./server/routes/*.ts'], // Path to the API routes
};

export const specs = swaggerJsdoc(options); 