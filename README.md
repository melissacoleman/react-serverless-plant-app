## Plant inventory app

Serverless web app as a way to learn React and familiarise myself with more AWS services - and also keep track of my plants.

## Inspiration

Based on create-react-app and with help of:

Use of AWS AppSync for creating a GraphQL API with DynomoDB.
https://tylermcginnis.com/building-serverless-react-graphql-apps-with-aws-appsync

Using AWS Cognito via AWS Mobile for user management and S3 buckets for image upload.

## Install (prob not complete)

```
npm install -g awsmobile-cli
awsmobile configure aws
awsmobile init --yes
awsmobile appsync configure
awsmobile push
```

## Change log

* CSS formatting
* Added AWS Cognito user profiles to keep site content safe (signup disabled)
* Added delete functionality
* Adding edit functionality
* Added filtering
* Adding image upload

## Todo

* Add to gh-pages
* form validation
* Add Content
* Unsubscribe

## Known issues

* Insane amount of overlap between plantformadd and plantformedit :(
