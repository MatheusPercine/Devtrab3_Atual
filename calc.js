

function Calcular_Montante(valorFinanciado, t, p){
    var montante = valorFinanciado * t * p;
    return montante;
}

function Calcular_PrestacaoMensal(valorFinanciado, t, p) {
    var entrada = (1 + (p-1));
    valorFinanciado = valorFinanciado - entrada;
    x = Calcular_Montante(valorFinanciado, t, p)
    var prestacao = x/p;
    return prestacao;
}

function Calcular_CoeficienteFinanciamento(t, p){
    var CF = t /  1 - Math.pow((1 + t), -p);
    return CF;
}

function Calcular_ValorPago(valorFinanciado, t, p){
    var prestacao = Calcular_PrestacaoMensal(valorFinanciado, t, p);
    var valor_pago = prestacao*p;
    return valor_pago;
}

function Calcular_TaxaReal(){
    var treal = 3
    return treal
}

function Calcular_ValorCorrigido(){
    var valor_corrigido = 0
    return valor_corrigido
}

function Calcular_Juros(valorFinanciado, t, mes){
    var juros = valorFinanciado * t;
    return juros;
}

function Calcular_Amortizacao(valorFinanciado, t, p, mes){
    var prestacao = Calcular_PrestacaoMensal(valorFinanciado, t, p);
    var juros = Calcular_Juros(valorFinanciado, t, mes)
    var amortizacao = prestacao - juros;
    return amortizacao;
}

function Calcular_SaldoDevedor(valorFinanciado, valorFinal, t, p, mes){
    var amortizacao = Calcular_Amortizacao(valorFinanciado, valorFinal, t, mes, p);
    var saldo_devedor = valorFinanciado - amortizacao;
    return saldo_devedor;
}



document.getElementById("submitButton").onclick = function (e) {
    e.preventDefault();
    var p = document.getElementById("parc").value; // parcelamento
    var t = (document.getElementById("itax").value)/100; // taxa mensal de juros
    var valorFinanciado = document.getElementById("ipv").value;
    var valorFinal = document.getElementById("ipp").value;
    var valorVoltar = document.getElementById("ipb").value;
    var entrada = document.getElementById("idp").value;

    var prestacao = Calcular_PrestacaoMensal(valorFinanciado, t, p);
    var CF = Calcular_CoeficienteFinanciamento(t, p);
    var valorPago = Calcular_ValorPago(valorFinanciado, t, p);
    var treal = Calcular_TaxaReal();
    var valorCorrigido = Calcular_ValorCorrigido();
    var amortizacao = Calcular_Amortizacao(valorFinanciado, t, p, 5);
    var saldoDevedor = Calcular_SaldoDevedor(valorFinanciado, valorFinal, t, p, 5);
    var juros = Calcular_Juros(valorFinanciado, t, 3);

    document.getElementById("resultado1").innerHTML = `
    <div class="boxes">
        <div id="box1">
            <p id="output">Parcelamento: ${p} </p>
            <p id="output">Taxa: ${t} </p>
            <p id="output">Valor Financiado: ${valorFinanciado} </p>
            <p id="output">Valor Final: ${valorFinal} </p>
            <p id="output">Valor a Voltar: $0.00 </p>
            <p id="output">Entrada: False </p>
        </div>

        <div id="box2">
            <p id="output">Prestação: ${prestacao}</p>
            <p id="output">Coeficiente de Financiamento: ${CF} </p>
            <p id="output">Valor Pago: ${valorPago}</p>
            <p id="output">Taxa Real: ${treal}</p>
            <p id="output">Valor Corrigido: $${valorCorrigido.toFixed(2)}</p>
        </div>
    </div>`;
    document.getElementById("resultado2").innerHTML = `
    <div id="titulo_tabela">
        <div>
            <p>Tabela Price</p>  
        </div> 
                    
        <div>
            <table id="tabela">
                <thead id="nomes_colunas">
                    <tr>
                        <th>Mês</th>
                        <th>Prestação</th>
                        <th>Juros</th>
                        <th>Amortização</th>
                        <th>Saldo Devedor</th>
                    </tr>
                </thead>
                <tbody id="tabelaBody"></tbody>
            </table>       
        </div> 
    </div>
    `
    
    var numeroDeRepeticoes = 96;
    var tabelaBody = document.getElementById("tabelaBody");
    var prestacaoTotal = 0;
    var jurosTotal = 0;
    var amortizacaoTotal = 0;
    var saldoDevedorTotal = 0;

    for (var i = 1; i <= numeroDeRepeticoes; i++) {
        
        prestacaoTotal += prestacao;
        jurosTotal += juros;
        amortizacaoTotal += amortizacao;
        saldoDevedorTotal += saldoDevedor;

        // Cria uma nova linha <tr>
        var linha = document.createElement("tr");
        
        // Cria as células <td> e atribui valores a elas
        var celula = document.createElement("td");
        celula.textContent = `${i}`;
        linha.appendChild(celula);
        var celula = document.createElement("td");
        celula.textContent = `${prestacao}`;
        linha.appendChild(celula);
        var celula = document.createElement("td");
        celula.textContent = `${juros}`;
        linha.appendChild(celula);
        var celula = document.createElement("td");
        celula.textContent = `${amortizacao.toFixed(2)}`;
        linha.appendChild(celula);
        var celula = document.createElement("td");
        celula.textContent = `${saldoDevedor.toFixed(2)}`;
        linha.appendChild(celula);
        
        // Adiciona a linha ao corpo da tabela
        tabelaBody.appendChild(linha);
    }

    var linha = document.createElement("tr");
    var celula = document.createElement("th");
    celula.textContent = `Total`;
    linha.appendChild(celula);
    var celula = document.createElement("th");
    celula.textContent = `${prestacaoTotal.toFixed(2)}`;
    linha.appendChild(celula);
    var celula = document.createElement("th");
    celula.textContent = `${jurosTotal}`;
    linha.appendChild(celula);
    var celula = document.createElement("th");
    celula.textContent = `${amortizacaoTotal.toFixed(2)}`;
    linha.appendChild(celula);
    var celula = document.createElement("th");
    celula.textContent = `${saldoDevedorTotal.toFixed(2)}`;
    linha.appendChild(celula);
    tabelaBody.appendChild(linha);
};