// KLASA KANBAN CARD
function Card(id, name, columnId) {
  	var self = this;
    this.columnId = columnId;
  	this.id = id;
  	this.name = name || 'No name given';
  	this.element = generateTemplate('card-template', { name: this.name }, 'li');

  	this.element.querySelector('.card').addEventListener('click', function (event) {
    	event.stopPropagation();

    	if (event.target.classList.contains('btn-delete')) {
      		self.removeCard();
        }
        if (event.target.classList.contains('edit-card')) {
            var newCardName = prompt("Enter the name of the card");
            event.preventDefault();

            var data = new FormData();
            data.append('name', newCardName);
            data.append('bootcamp_kanban_column_id', self.columnId);
            data.append ('id', self.id );
            fetch(prefix + baseUrl + '/card/' + self.id,  {
                method: 'PUT',
                headers: myHeaders,
                body: data,
              })
              .then(function(res) {
                return res.json();
              })
              .then(function(resp) {
                var card = new Card(resp.id, cardName);
                self.addCard(card);
              });
          
            
	    }
  	});
}
Card.prototype = {
  removeCard: function() {
    var self = this;
    
    fetch(prefix + baseUrl + '/card/' + self.id, { method: 'DELETE', headers: myHeaders })
        .then(function(resp) {
        return resp.json();
        })
        .then(function(resp) {
        self.element.parentNode.removeChild(self.element);
        })
    }
  }
