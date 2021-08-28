# mt.ax

Serverless Short URL service. 

## Requirements

Requirements

* AWS-CLI
* Serverless

## Deploy

Easy deploy to AWS with serverless cli.

```
npm install
serverless deploy --region <region> --stage <stage>
```

### Import example data

You can import example data to DynamoDB for testing purpose

```
aws dynamodb batch-write-item --region eu-west-1 --request-items file://example_items.json
```