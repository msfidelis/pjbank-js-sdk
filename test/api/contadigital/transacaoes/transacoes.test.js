'use strict';

const PJBankSDK = require('../../../../lib/pjbank');

const Lab = require('lab');
const lab = exports.lab = Lab.script();

const suite = lab.suite;
const test = lab.test;

const expect = require('chai').expect;
const assert = require('chai').assert;


suite("#CONTADIGITAL - #Transacoes", () => {

    test('Criando uma transferência via DOC/TED', (done) => {

        const PJBank = new PJBankSDK(credencialContaDigital, chaveContaDigital);

        const DadosTransacao = {
            "data_vencimento": "09/30/2017",
            "data_pagamento": "09/30/2017",
            "valor": 20.00,
            "banco_favorecido": "033",
            "agencia_favorecido": "1111",
            "conta_favorecido": "11111",
            "cnpj_favorecido": "45475754000136",
            "nome_favorecido": "Cliente Exemplo",
            "descricao": "Descrição de exemplo",
            "solicitante": "Teste DOC/TED",
            "tipo_conta_favorecido": "corrente"

        };

        PJBank.ContaDigital.Transacao(DadosTransacao)
            .then((transacao) => {

                expect(transacao).to.have.property('status');
                assert.equal(transacao.status, 201);

                expect(transacao).to.have.property('data');
                expect(transacao.data).to.be.a('array');
                expect(transacao.data[0]).to.have.property('msg');
                expect(transacao.data[0]).to.have.property('id_operacao');
                expect(transacao.data[0]).to.have.property('data_pagamento');
                assert.equal(transacao.data[0].data_pagamento, DadosTransacao.data_pagamento);

                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });

    });


    test('Pagamendo uma despesa com linha digitável', (done) => {

        const PJBank = new PJBankSDK(credencialContaDigital, chaveContaDigital);

        const DadosTransacao = {
            "data_vencimento": "09/30/2017",
            "data_pagamento": "09/30/2017",
            "valor": 10.50,
            "codigo_barras": "03399699255873781001843279301014571980000001000"
        };

        PJBank.ContaDigital.Transacao(DadosTransacao)
            .then((transacao) => {

                expect(transacao).to.have.property('status');
                assert.equal(transacao.status, 201);

                expect(transacao).to.have.property('data');
                expect(transacao.data).to.be.a('array');
                expect(transacao.data[0]).to.have.property('msg');
                expect(transacao.data[0]).to.have.property('id_operacao');
                expect(transacao.data[0]).to.have.property('data_pagamento');
                assert.equal(transacao.data[0].data_pagamento, DadosTransacao.data_pagamento);

                done();
            })
            .catch((err) => {
                console.log(err);
                done();
            });

    });

});