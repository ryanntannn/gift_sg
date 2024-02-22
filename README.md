# 🎁 GiftSG

<img width="1209" alt="image" src="https://github.com/ryanntannn/gift_sg/assets/13270108/7cc473a9-f7f0-404f-b106-55061e168827">

GiftSG is a simple web application that allows a receptionist to manage corporate gift redemptions for a company's employees.

_This project was made as a Technical Assessment for a job application._

## User Flow

- As a receptionist, I will ask the employees for their staff pass ID and team name, or scan their staff pass if available.
- I will then input the staff pass ID into the system to verify the employee's eligibility for a gift redemption.
- If the employee is eligible, I will tell the employee how many gifts their team is eligible for, and ask them to choose a gift from the available options.
- I will key in the number of gifts redeemed for the employee, and the system will update the remaining number of gifts for the employee's team.

## Assumptions made

- The receptionist will be the only user of the system. (No race conditions)
- No new employees will be added to the system after the system is set up.
- Given CSV files will be used to seed the database, and are not expected to be updated after the system is set up.

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- Jest

## Getting Started

1. Clone the repository
2. Install the dependencies

```bash
npm install
```

3. Setup .env file. This will create a new .env file with the required environment variables.

```bash
cp .env.example .env
```

4. Set up the database. This will create a new docker container with a PostgreSQL database and run the migrations and seed script.

```bash
npm run db-up
```

5. Start the development server

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
