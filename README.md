# Team Vimily TODO List

## Installation

### API `api/`

Copy `.env.example` to `.env`
```bash
cp api/.env.example api/.env
```

Run the docker-compose
```bash
docker-compose pull
docker-compose up -d
```

Generate APP Key
```bash
docker-compose exec vimily_app php artisan key:generate
```

Seed the database
```bash
docker-compose exec vimily_app php artisan db:seed
```

Test:

http://localhost:8000/api/todo

Debugging:

http://localhost:8000/clockwork/app

### Frontend `frontend/`

Install packages 
```bash
yarn
```

Start the Server
```bash
yarn start
```

Test:

http://localhost:3000/

