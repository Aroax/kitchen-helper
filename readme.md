init


## Setting up Database

`brew tap mongodb/brew`

`brew install mongodb-community`

`brew services start mongodb-community`

```
db.users.insert({
  email: '',
  displayName: '',
  password: '',  
  pantry: [
    {
      foodId: '',
      name: '',
      foodCategory: '',
      location: '',
      unit: '',
      quantity: '',
      weight: '',
      imageUrl: '',
      threshold: '',
      expiry: '',
      health: '',
      diet: ''
    },
    {
      foodId: '',
      name: '',
      foodCategory: '',
      location: '',
      unit: '',
      quantity: '',
      weight: '',
      imageUrl: '',
      threshold: '',
      expiry: '',
      health: '',
      diet: ''
    }],
  preferences: {
    allergies: [''],
    dietaryRequirements: [''],
    likes: [''],
    dislikes: ['']
  },
  shoppingList: [
  {
    foodId: '',
    name: '',
    foodCategory: '',
    location: '',
    unit: '',
    quantityNeeded: '',
    weightNeeded: '',
    imageUrl: ''
  }]
})

```

```
db.users.insert({
  email: 'mike@example.com',
  displayName: 'mikeyMike',
  password: '123',  
  pantry: [
    {
      foodId: 'food_b00mwy0bne9gs4au15ja8ab10h0e',
      name: 'Sage',
      foodCategory: 'Condiments and Sauces',
      location: 'Cupboard',
      unit: 'Sprig',
      quantity: '1',
      weight: '8',
      imageUrl: 'https://www.edamam.com/food-img/509/50984580e9aad4b4ddd5b7ed45a64bf4.jpg',
      threshold: '0.25',
      expiry: Date(),
      health: ['alcohol-free', 'crustacean-free'],
      diet: ['low-carb']
    },
    {
      foodId: 'alphafoxtrot',
      name: 'Unicorn hair',
      foodCategory: 'Mythical',
      location: 'Dreams',
      unit: 'Strand',
      quantity: '1',
      weight: '0.1',
      imageUrl: 'https://w7.pngwing.com/pngs/673/645/png-transparent-unicorn-drawing-bright-unicorn-hair-horse-black-hair-female-hair.png',
      threshold: '1',
      expiry: Date(),
      health: ['alcohol-free', 'crustacean-free'],
      diet: ['low-carb']
    }],
  preferences: {
    allergies: ['crustaceans'],
    dietaryRequirements: ['vegan'],
    likes: ['Italian', 'Blue cheese'],
    dislikes: ['Unicorn hair']
  }
})
```

``> db.users.find( {displayName: 'mikeyMike'} ).pretty()`` > returns all data kept for just user with displayName mikeyMike

``> db.users.find({pantry: {$elemMatch: {name: 'Sage'}}}).pretty()`` > returns all user objects that contain 'Sage' within their pantry
