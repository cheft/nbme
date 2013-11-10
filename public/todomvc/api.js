
/* The model */

function Todo(db) {

   db = db || DB('todo-riot');

   var client = new $.RestClient('/');
   client.add('todos');

   var self = $.observable(this);
   var items = [];
   
   self.load = function() {
	   client.todos.read().done(function(data) {
	      items = data;
	      self.trigger('load', data);
	   });
   }

   self.add = function(name) {
      var item = { id: "_" + ("" + Math.random()).slice(2), name: name }
      items[item.id] = item;
      self.trigger("add", item);
   }

   self.edit = function(item) {
      items[item.id] = item;
      self.trigger("edit", item);
   }

   self.remove = function(filter) {
      /*
      var els = self.items(filter);
      $.each(els, function() {
         delete items[this.id]
      })
      */
      self.trigger("remove", filter);
   }

   self.toggle = function(id) {
      var item = items[id];
      item.done = !item.done;
      self.trigger("toggle", item);
   }

   // @param filter: <empty>, id, "active", "completed"
   self.items = function(filter) {
      var ret = [];
      $.each(items, function(id, item) {
         if (!filter || filter == id || filter == (item.done ? "completed" : "active")) ret.push(item)
      })
      return ret;
   }

   // sync database
   /*
   self.on("add remove toggle edit", function() {
      db.put(items);
   });
   */

   self.on('add', function(data) {
      client.todos.create(data);
   });

   self.on('remove', function(data) {
      client.todos.del(data);
   });
   
   self.on('toggle', function(data) {
      client.todos.update(data.id, data);
   });
   
   self.on('edit', function(data) {
      client.todos.update(data.id, data);
   });
}