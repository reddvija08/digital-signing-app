# digital-signing-app

This project implements a digital signing functionality similar to Adobe Sign. It allows users to create, verify, and manage digital signatures through a web application.

## Features

- Create digital signatures
- Verify existing signatures
- Check the status of signatures

## Project Structure

```
digital-signing-app
├── src
│   ├── app.ts                # Entry point of the application
│   ├── controllers
│   │   └── signingController.ts # Handles requests related to signatures
│   ├── services
│   │   └── signingService.ts  # Contains business logic for digital signing
│   ├── routes
│   │   └── signingRoutes.ts    # Defines routes for the application
│   └── types
│       └── index.ts            # Defines data structures for requests and responses
├── package.json                # npm configuration file
├── tsconfig.json               # TypeScript configuration file
└── README.md                   # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/digital-signing-app.git
   ```
2. Navigate to the project directory:
   ```
   cd digital-signing-app
   ```

3. Install the dependencies:
   ```
   npm install
   npm install multer
   npm install @types/multer --save-dev

   ```

## Usage

1. Start the application:
   ```
   npm start
   ```
2. Access the application at `http://localhost:3000`.

## API Endpoints

- `POST /signatures` - Create a new digital signature
- `POST /signatures/verify` - Verify an existing signature
- `GET /signatures/status` - Get the status of a signature

## Contributing

Feel free to submit issues or pull requests to improve the functionality of this application.
