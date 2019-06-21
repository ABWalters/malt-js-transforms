# malt-js-transforms

Maltego Transforms for Crt.Sh written in Javascript (Node).

## Usage
### Hosted


### Local Transforms
Download the project to your machine:
```
git clone https://github.com/ABWalters/malt-js-transforms.git
```

Install the node dependencies:
```
cd malt-js-transforms
npm install --only=prod
```

Run the transforms using the following command:
```
node src/index.js <transform_name>
```

### Test on Localhost
You can start a test serve runnin on local host by running the command:
```
npm start
```

### Self-Deployed
Running the command `npm run deploy`, the transforms will be deployed to AWS lambda using the [serverless framework](https://serverless.com/).

Update the `serverless.yml` file to deploy the transforms to your own environment.
