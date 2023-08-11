class CaixaDaLanchonete {
    constructor() {
      this.cardapio = {
        cafe: { descricao: "Café", valor: 3.00 },
        chantily: { descricao: "Chantily (extra do Café)", valor: 1.50, extra: true },
        suco: { descricao: "Suco Natural", valor: 6.20 },
        sanduiche: { descricao: "Sanduíche", valor: 6.50 },
        queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.00, extra: true },
        salgado: { descricao: "Salgado", valor: 7.25 },
        combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.50 },
        combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.50 }
      };
  
      this.formasDePagamento = ["dinheiro", "debito", "credito"];
    }
  
    calcularValorTotal(itemInfo, quantidadeInt) {
      return itemInfo.valor * quantidadeInt;
    }
  
    validarItem(codigo) {
      return this.cardapio.hasOwnProperty(codigo);
    }
  
    validarQuantidade(quantidade) {
      const quantidadeInt = parseInt(quantidade);
      return !isNaN(quantidadeInt) && quantidadeInt > 0;
    }
  
    validarItemExtra(codigo, itens) {
      if (codigo === "queijo" && itens.includes("sanduiche")) {
        return true;
      } else if (codigo === "chantily" && itens.includes("cafe")) {
        return true;
      }
      return false;
    }
  
    calcularValorDaCompra(formaDePagamento, itens) {
      if (!this.formasDePagamento.includes(formaDePagamento)) {
        return "Forma de pagamento inválida!";
      }
  
      if (!itens || itens.length === 0) {
        return "Não há itens no carrinho de compra!";
      }
  
      let valorTotal = 0;
      const itensNoCarrinho = itens.map(item => item.split(',')[0]);
  
      for (const itemString of itens) {
        const [codigo, quantidade] = itemString.split(",");
        const itemInfo = this.cardapio[codigo];
  
        if (!this.validarItem(codigo)) {
          return "Item inválido!";
        }
  
        if (!this.validarQuantidade(quantidade)) {
          return "Quantidade inválida!";
        }
  
        if (itemInfo.extra) {
          if (!this.validarItemExtra(codigo, itensNoCarrinho)) {
            return "Item extra não pode ser pedido sem o principal";
          }
  
          valorTotal += this.calcularValorTotal(itemInfo, parseInt(quantidade));
        } else {
          if (!codigo.startsWith("combo")) {
            valorTotal += this.calcularValorTotal(itemInfo, parseInt(quantidade));
          }
        }
      }
  
      if (formaDePagamento === "dinheiro") {
        valorTotal *= 0.95;
      } else if (formaDePagamento === "credito") {
        valorTotal *= 1.03;
      }
  
      return "R$ " + valorTotal.toFixed(2).replace('.', ',');
    }
  }
  
  export { CaixaDaLanchonete };
