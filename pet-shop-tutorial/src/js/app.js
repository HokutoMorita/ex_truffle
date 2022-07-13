App = {
  web3Provider: null,
  contracts: {},
  selectedAddress: null,

  init: async function() {
    // Load pets.
    $.getJSON('../pets.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.pet-breed').text(data[i].breed);
        petTemplate.find('.pet-age').text(data[i].age);
        petTemplate.find('.pet-location').text(data[i].location);
        petTemplate.find('.pet-price').text(data[i].price + " ETH");
        petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

        petsRow.append(petTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async function() {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    } else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fall back to Ganache
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    App.selectedAddress = web3.eth.defaultAccount;

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Adoption.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var AdoptionArtifact = data;
      App.contracts.Adoption = TruffleContract(AdoptionArtifact);

      // Set the provider for our contract
      App.contracts.Adoption.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the adopted pets
      return App.markAdopted();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: async function() {
    try {
      const adoptionInstance = await App.contracts.Adoption.deployed();

      const adopters = await adoptionInstance.getAdopters.call();
      for (i = 0; i < adopters.length; i++) {
        if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
        }
      }
      const etherUnit = 1000000000000000000;
      const totalAmount = await adoptionInstance.getTotalAmount.call();
      const totalAmountText = "Pet's Recruitment total costs: " + (totalAmount / etherUnit) + " ETH";
      $('#totalCosts').text(totalAmountText);

    } catch(err) {
      console.log(err.message);
    }
    
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));
    console.log("ペットIDの確認: " + petId);

    web3.eth.getAccounts(async function(error, accounts) {
      if (error) {
        throw error;
      }

      if (accounts.includes(App.selectedAddress)) {
        throw "不正なアカウントです"
      }

      var account = accounts[0];
      console.log("Accountの確認: " + account);
      const petPrice = 5000000000000000;

      try {
        const adoptionInstance = await App.contracts.Adoption.deployed();
        // 0.005 ETH
        await adoptionInstance.adopt(petId, {from: account, value: petPrice});
      } catch(err) {
        console.log(err.message);
      }
      return App.markAdopted();
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();

    web3.currentProvider.on('accountsChanged', (accounts) => {
      console.log(accounts[0]);
      App.markAdopted();
    });
  });
});
