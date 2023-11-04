<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

Limoome test application for reading user data.

This application has 3 proxy layers.<br><br>
**Redis Cache**<br>
The first proxy layer will look for the user data in the redis.<br><br>
**Database Record**<br>
If the user is missing in the redis cache, will look for the sqlite database to serve the data.<br><br>
**Third Party API**<br>
If there wasn't user in the database will fetch the user data from the remote api and will store them in the database and will cache it in the redis for the next queries.

## Running the app

```bash
$ docker-compose up
```

The application will start on the port 5000. you can query the following address to get user data.

```
localhost:5000/api/users/:id
```

## Stay in touch

- Author - [Amir Chegini](mailto:amirchegini@gmail.com)

## License

Nest is [MIT licensed](LICENSE).
