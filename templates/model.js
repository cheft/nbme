App.<%= M %> = DS.Model.extend({
	<% var s = Object.getOwnPropertyNames(i).length, c = 0;
	for(var p in i) {c++; %>
	<%= p %>: DS.attr('<%= i[p].type %>')<% if(c < s) {%>,<% } %><% } %>
	
});