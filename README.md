# Blog App

## Description

This is a small blog built using React and Ruby on Rails. The blog consists of two types of posts: local and remote. Local posts are stored in a local Postgres database, while remote posts are fetched from the NewsAPI.

## Features

- Infinite scrolling for posts
- Basic CRUD interface for local posts (available only for authenticated users)
- Display of remote posts from the NewsAPI
- User authentication with Devise

## Setup

### Prerequisites

- Ruby
- Rails
- Node.js
- Yarn
- Postgres

### Installation

#### Clone the repository:

```sh
git clone https://github.com/andreypedro/blog-app
cd blog-app
```

#### Install dependencies:

```sh
bundle install
yarn install
```

#### Set up the database:

```sh
rails db:create
rails db:migrate
```

#### Set the NewsAPI key in the .env file:

```sh
echo "NEWS_API_KEY=your_news_api_key_here" > .env
```

#### Start the Rails server and Webpack dev server:

```sh
rails server
bin/webpack-dev-server
```

#### Testing

To run the tests, use the following command:

```sh
bundle exec rspec
```

#### Linter

To run the linter, use the following command:

```sh
yarn lint
```
