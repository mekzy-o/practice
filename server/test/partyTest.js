import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const baseUrl = 'api/v1/parties';
chai.should();

// Test Values
const nameOmitted = {
  hqaddress: 'Abuja, Nigeria',
  logourl: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
};
const addressOmitted = {
  name: 'PDP',
  logourl: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
};
const logoUrlOmitted = {
  name: 'PDP',
  hqAddress: 'Abuja, Nigeria',
};


// Test for default app route
describe('App', () => {
  it('The server should be running', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.be.eql('Welcome to API of Politico');
        done(err);
      });
  });
});

// Test for wrong route
describe('GET /', () => {
  it('should thrown an error when wrong request is made', (done) => {
    chai.request(app)
      .get('/hsfgfh')
      .end((err, res) => {
        res.should.have.status(404);
        done(err);
      });
  });
});

// Test for right route
describe('GET /parties', () => {
  it('should LIST ALL parties', (done) => {
    chai.request(app)
      .get('/api/v1/parties')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.data.should.be.a('array');
        res.body.data[0].should.have.property('id');
        res.body.data[0].should.have.property('name');
        res.body.data[0].should.have.property('hqAddress');
        res.body.data[0].should.have.property('logoUrl');
        done(err);
      });
  });
});

// Test when name is ommitted
describe('POST /parties', () => {
  it('should NOT CREATE party if NAME field is OMITTED', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .send(nameOmitted)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.error.should.be.eql('Party Name is required');
        done(err);
      });
  });
  it('should NOT CREATE party if ADDRESS field is OMITTED', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .send(addressOmitted)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.error.should.be.eql('hqAddress is required');
        done(err);
      });
  });
  it('should NOT CREATE party if logoUrl field is OMITTED', (done) => {
    chai.request(app)
      .post('/api/v1/parties')
      .send(logoUrlOmitted)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.error.should.be.eql('logoUrl is required');
        done(err);
      });
  });
});
