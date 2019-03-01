//applying migration
exports.up = function(knex, Promise) {
    return createUsersTable()
        .then(createPostTable)
        .then(createCategoriesTable)
        .then(createCommentsTable)
        .then(createPostMetadataTable)
        .then(createPostCategoriesTable)
        .catch(err => console.log(err));

        function createUsersTable () {
            return knex.schema.createTable('users', (table) => {
                table.increments().primary();
                table.string('username');
                table.string('password');
                table.string('first_name');
                table.string('last_name');
            })
        }
        
        function createPostTable () {
            return knex.schema.createTable('posts', (table) => {
              table.increments().primary();
              table.string('title', 20);
              table.string('description', 800);
              table.string('URL');
              table.date('create_time');
              table.integer('user_id').references('id').inTable('users');
            })
        }

        function createCategoriesTable () {
            return knex.schema.createTable('categories', (table) => {
              table.increments().primary();
              table.string('category_name')
            })
        }

        function createCommentsTable () {
            return knex.schema.createTable('comments', (table) => {
              table.increments().primary();
              table.string('content');
              table.date('create_time');
              table.integer('user_id').references('id').inTable('users');
              table.integer('post_id').references('id').inTable('posts');
            })
        }

        function createPostMetadataTable () {
            return knex.schema.createTable('post_metadata', (table) => {
              table.increments().primary();
              table.boolean('like').defaultTo(false);
              table.integer('rating');
              table.integer('user_id').references('id').inTable('users');
              table.integer('post_id').references('id').inTable('posts');
            })
        }

        function createPostCategoriesTable () {
            return knex.schema.createTable('post_categories', (table) => {
                table.increments().primary();
                table.integer('categories_id').references('id').inTable('categories');
                table.integer('post_id').references('id').inTable('posts');        
            })
        }

  };

//rolling back migration 
exports.down = function(knex, Promise) {
 return knex.schema.dropTable('users')
 .then(knex.schema.dropTable('posts'))
 .then(knex.schema.dropTable('categories'))
 .then(knex.schema.dropTable('comments'))
 .then(knex.schema.dropTable('post_metadata'))
 .then(knex.schema.dropTable('post_categories'));   
};