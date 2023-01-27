# STIM Games SDK

TypeScript/JavaScript SDK for interaction with STIM Experience

We are rendering games as an iframe and using iframe messages to communicate with the stim platform. This sdk provides promise based methods to simplify ping-pong between iframe app and parent platform.

## Installing

```
npm install @stimapp/games-sdk  --save
```

## Methods

### authorize()

This is async method which returns userId or an error

```
const userId = await gameSDK.authorize()

localStorage.setItem('userId', userId);
```

### requestEmail()

This is async method which returns email or an error

```
const email = await gameSDK.requestEmail()
```

### checkPurchases()

This is async method which returns status of paid posts or an error

It takes as an argument one or few post ids and returns an object:

```
{
	[postId1]: isLocked,
	[postId2]: isLocked
}
```

```
const email = await gameSDK.checkPurchases(['postId1', 'postId2'])
```

### purchase()

This method redirects user to a post by id

```
gameSDK.purchase('postId1')
```

then user will be able to pay to unlock and on success it will be redirected back to the app. Please, use `checkPurchases` method to check result

```
gameSDK.checkPurchases(['postId1'])
```

## Usage

Please, check examples folder

![Usage Schema](sdk.png)
