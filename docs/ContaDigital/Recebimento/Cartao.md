
# Criar uma transacão de Cartão de Crédito via API para receber em sua *Conta Digital*

## Quickstart rápido

> O mínimo que você vai precisar para gerar um pagamento via cartão 

```javascript

const PJBank = new PJBankSDK(credencialContaDigital, chaveContaDigital);

PJBank.transacao({
        numero_cartao: "4012001037141112",
        nome_cartao: "Cliente Exemplo",
        mes_vencimento: "05",
        ano_vencimento: "2018",
        cpf_cartao: "07727876208",
        email_cartao: "api@pjbank.com.br",
        celular_cartao: "",
        codigo_cvv: "123",
        valor: 1,
    })
    .then(transacao => console.log(transacao))
    .catch(err => console.log(err));
```


### Output 
```json

{ 
    "status": "201",
    "token_cartao": "cb3e702e1fa20366bf9eb1da7eabd64f471c2dee",
    "tid": "2017000006910010656310",
    "previsao_credito": "09/15/2017",
    "msg": "Transacao capturada com sucesso",
    "tid_conciliacao": "1006993069000AC0F48A",
    "bandeira": "visa",
    "autorizacao": "123456",
    "cartao_truncado": "4012********1112",
    "statuscartao": "200",
    "tarifa": "0.07",
    "taxa": "7" 
}

```

## Gerando uma transação utilizando um Token

> Após o primeiro pagamento utilizando os dados do cartão, será devolvido um `token_cartao`. Este token pode ser armazenado para realizar futuras transações. 

```javascript
PJBank.transacao({
        'token_cartao': "80bafbb311c8ca17b06a6027fe1bcc8ad635602a",
        'valor': 10.4
    })
    .then(transacao => console.log(transacao))
    .catch(err => console.log(err));
```

## Gerando uma transação parcelada no cartão 

> Você pode informar o numero de parcelas num máximo de 12x para realizar o pagamento.

```javascript
PJBank.transacao({
        'token_cartao': "80bafbb311c8ca17b06a6027fe1bcc8ad635602a",
        'valor': 500, 
        'parcelas': 3
    })
    .then(transacao => console.log(transacao))
    .catch(err => console.log(err));
```



## Cancelamento de uma transacao 

> Você pode facilmente cancelar uma transacão de Cartão de Crédito informando o `tid` gerado na criacão da mesma.

```javascript
const PJBank = new PJBankSDK(credencialContaDigital, chaveContaDigital);

PJBank.cancelar("2017000006910010656914")
    .then(cancelamento => console.log(cancelamento))
    .catch(err => console.log(err));
```

### Output 

```json
{
    "status": "200",
    "msg": "Sucesso."
}
```

## Tokenizando um cartão de crédito. 

> Durante o primeiro pagamento com os dados do cartão, será retornado um `token_cartao` para futuras operacões seguras conforme as recomendacões do `PCI`. Porém é possível tokenizar um cartão de crédito antes de efetuar um pagamento. 

```javascript
const DadosCartao = {
    "nome_cartao": "Cliente Exemplo",
    "numero_cartao": "4012001037141112",
    "mes_vencimento": "05",
    "ano_vencimento": "2018",
    "cpf_cartao": "64111456529",
    "email_cartao": "api@pjbank.com.br",
    "celular_cartao": "978456723",
    "codigo_cvv": "123"
};

PJBank.tokenizar(DadosCartao)
    .then(token => console.log(token))
    .catch(err => console.log(err));
```

### Output


```json
{ 
    "status": "201",
    "token_cartao": "8e772dceaf32305c302c35b2bd3f66ef93641c82",
    "msg": "Sucesso ao tokenizar" 
}
```
