# Adonis fullstack application


## Cheatsheet

The commands I needed to learn to build this application:

Use the adonis command to install the blueprint
```bash
adonis new easyMedicineConf
```

### ORM and Migrations
Adonis uses [Knexjs](https://knexjs.org/) as ORM.

Run migrations
```js
adonis migration:run
```

Rollback migrations
```js
adonis migration:rollback
```

Create a Resource (Model, Controller, Migration)
```js
adonis make:model ResourceName --migration --controller
```



This is the fullstack boilerplate for AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Session
3. Authentication
4. Web security middleware
5. CORS
6. Edge template engine
7. Lucid ORM
8. Migrations and seeds

