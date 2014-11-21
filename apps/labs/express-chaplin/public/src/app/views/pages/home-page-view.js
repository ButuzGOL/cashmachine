define([
  'views/base/page-view',
  'models/card',
  'mediator',
  'views/cards/new-form-view',
  'text!views/templates/pages/home-page.jade'
], function(PageView, CardModel, mediator, CardsNewFormView, template) {
  'use strict';

  var PagesHomePageView = PageView.extend({
    id: 'pages-home-page-view',
    autoRender: true,
    template: template,
    regions: {
      'cards-new-form': '#cards-new-form-container'
    },
    listen: {
      'signinStatus mediator': 'render'
    },
    render: function() {
      PageView.prototype.render.apply(this, arguments);
      this.createCardsNewForm();
    },
    createCardsNewForm: function() {
      var _this = this,
          cardsNewForm;
      
      if (this.card) {
        this.card.dispose();
      }
      this.card = new CardModel();

      cardsNewForm = new CardsNewFormView({
        model: this.card,
        region: 'cards-new-form'
      });

      cardsNewForm.on('dispose', function() {
        _this.createCardsNewForm();
      });

      this.subview('cardsNewForm', cardsNewForm);
    },
  });

  return PagesHomePageView;
});
