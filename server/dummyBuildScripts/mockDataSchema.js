export const schema = {
  type: 'object',
  properties: {
    meals: {
      type: 'array',
      minItems: 3,
      maxItems: 5,
      items: {
        type: 'object',
        properties: {
          id: {
            $ref: '#/definitions/positiveInt'
          },
          title: {
            type: 'string',
            faker: 'lorem.word'
          },
          description: {
            type: 'string',
            faker: 'lorem.sentence'
          },
          image: {
            type: 'string',
            faker: 'system.filePath'
          },
          price: {
            type: 'integer',
            // 'minimum': 10
            faker: 'commerce.price',
            minimum: 0,
            maximum: 900
          }
        },
        required: ['id', 'title', 'description', 'image', 'price']
      }
    }
  },
  required: ['meals'],
  definitions: {
    positiveInt: {
      type: 'integer',
      minimum: 0,
      exclusiveMinimum: true
    }
  }
};

// export const schema = {
//   type: 'object',
//   properties: {
//     meals: {
//       type: 'array',
//       minItems: 3,
//       maxItems: 5,
//       items: {
//         type: 'object',
//         properties: {
//           id: {
//             $ref: '#/definitions/positiveInt'
//           },
//           title: {
//             type: 'string',
//             faker: 'lorem.word'
//           },
//           description: {
//             type: 'string',
//             faker: 'lorem.sentence'
//           },
//           image: {
//             type: 'string',
//             faker: 'system.filePath'
//           },
//           price: {
//             type: 'integer',
//             // 'minimum': 10
//             faker: 'commerce.price',
//             minimum: 0,
//             maximum: 900
//           }
//         },
//         required: ['id', 'title', 'description', 'image', 'price']
//       }
//     }
//   },
//   required: ['meals'],
//   definitions: {
//     positiveInt: {
//       type: 'integer',
//       minimum: 0,
//       exclusiveMinimum: true
//     }
//   }
// };