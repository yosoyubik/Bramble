// Specifically request an abstraction for MetaCoin
var Manager = artifacts.require("Manager");
var SampleDb = artifacts.require("SampleDb");
var RegistryManager = artifacts.require("RegistryManager");
var RegistryManagerEnabled = artifacts.require("RegistryManagerEnabled");
var ManagerEnabled = artifacts.require("ManagerEnabled");
var Sample = artifacts.require("Sample");
var bs58 = require('bs58');
var multihash = require('multihashes');

contract('manager', function (accounts) {
  
  // Contract objects and variables
  var registryManager = RegistryManager.at(RegistryManager.address);
  var manager = Manager.at(Manager.address);
  var mangerEnabled = ManagerEnabled.at(ManagerEnabled.address);
  var managerAddress = manager.address;
  var registryManager = RegistryManager.at(RegistryManager.address);
  var ipfsHASH = [
    ['QmZTR5bcpQD7cFgTorqxZDYaew1Wqgfbd2ud9QqGPAkK2V', 1688, 'about'],
    ['QmYCvbfNbCwFR45HiNP45rwJgvatpiW38D961L5qAhUM5Y', 200,  'contact'],
    ['QmY5heUM5qgRubMDD1og9fhCPA6QdkMp3QCwd4s7gJsyE7', 322,  'help'],
    ['QmdncfsVm2h5Kqq9hPmU7oAVX2zTSVP3L869tgTbPYnsha', 1728, 'quick-start'],
    ['QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB', 1102, 'readme'],
    ['QmTumTjvcYCAvRRwQ8sDRxh8ezmrcr88YFU7iYNroGGTBZ', 1027, 'security-notes']
  ];  
  // Create all contracts
  var contracts = [
    [Sample.address, "sample"],
    [SampleDb.address, "sampledb"],
    [RegistryManager.address, "registrymanager"],
    [RegistryManagerEnabled.address, "registrymanagerenabled"],
    [ManagerEnabled.address, "managerenabled"]
  ];
  
  it("contracts creation should assert true", function (done) {
    for (var i = 0; i < contracts.length; i++) {
      manager.addContract(contracts[i][1], contracts[i][0]);
    }
    // Check number of contracts actually added
    manager.contractsLength.call().then(function(data) {
      assert.strictEqual(data['c'][0], 5, 'Created 5 contracts');
      done();
    });
  });
  
  it("MANAGER address assigned to ManagerEnabled", function (done) {
    mangerEnabled.getManagerAddress.call().then(ans => {
      assert.strictEqual(ans, manager.address);
      done();
    });
  });

  it("sample submited correctly", function(done) {
    var multiHash = multihash.decode(bs58.decode(ipfsHASH[0][0]));
    var digest = `0x${multiHash.digest.toString('hex')}`;
    var code = multiHash.code;
    var length = multiHash.length;
    var ans = registryManager.submitSample(digest, code, length);
    done();    
  });
  // it("there is one sample registered by user", function(done) {
  //   var ans = registryManager.numberOfSamples.call();
  //   ans.then(nSamples => {
  //     assert.strictEqual(parseInt(nSamples, 10), 1);
  //     done();
  //   })
  // });
  it("sample extraction correctly", function(done) {
    // We ask for the first sample added by this user.
    var ans = registryManager.extractSample.call(1);
    ans.then(ans => {
      var digest = multihash.fromHexString(ans[0].replace('0x', ''));
      var code = ans[1];
      var length = ans[2];
      var ans_hash = bs58.encode(multihash.encode(digest, parseInt(code, 10), parseInt(length, 10)));
      assert.strictEqual(ipfsHASH[0][0], ans_hash);
      done();
    });
  });  
  
  //////////////////////////////////////////////////////////////////////////////
  // Cleaning up tests (removal of contracts...etc)
  //////////////////////////////////////////////////////////////////////////////
  it("contract sample removed should assert true", function (done) {
    manager.removeContract('sample');
    manager.contractsLength.call().then(function(data) {
      assert.strictEqual(data['c'][0], 4, 'Removed 1 contracts');
      done();
    });
  });
  it("all contracts removed should assert true", function (done) {
    manager.remove();
    manager.contractsLength.call().then(function(data) {
      assert.strictEqual(data['c'][0], 0, '0 contracts in manager');
      done();
    });
  });
});
