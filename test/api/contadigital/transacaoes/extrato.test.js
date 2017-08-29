'use strict';

const PJBankSDK = require('../../../../lib/pjbank');

const Lab = require('lab');
const lab = exports.lab = Lab.script();

const suite = lab.suite;
const test = lab.test;

const expect = require('chai').expect;
const assert = require('chai').assert;


suite("#CONTADIGITAL - #Extrato", () => {

    test('Gerando o extrato de transacões filtrado por data', (done) => {

        const PJBank = new PJBankSDK(credencialContaDigital, chaveContaDigital);

        const opcoes = {
            data_inicio: "08/01/2017",
            data_fim: "08/09/2017"
        };

        PJBank.ContaDigital.Extrato(opcoes)
            .then(extrato => {
                expect(extrato).to.have.property('status');
                assert.equal(extrato.status, 200);

                expect(extrato).to.have.property('data');
                expect(extrato.data).to.be.a('array');

                done();
            })
            .catch(err => {
                console.log(err);
                done();
            });

    });

});