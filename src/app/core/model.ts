export class Chamada {
  periodosSelecionados: any;
  alunosPresentes: any;
  dateChamada: Date;
}



export class Endereco {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
}

export class Pessoa {
  codigo: number;
  nome: string;
  endereco = new Endereco();
  ativo = true;
}

export class Categoria {
  codigo: number;
}

export class Lancamento {
  codigo: number;
  tipo = 'RECEITA';
  descricao: string;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  observacao: string;
  pessoa = new Pessoa();
  categoria = new Categoria();
}


export class Professor {
  codigo: number;
  nome: string;
  email: string;
  celular: string;
  telefone: string;
  foto: String;
  urlFoto: String;
}

export class Usuario {
  login: string;
  tipoUsuario: String;
}

export class Turma {
  codigo: number;
  nome: String;
  periodos: Periodo[];
}


export class Periodo {
  quant: number;
  nome: String;
  value: String;
}

export class Aluno {
  codigo: number;
  nome: string;
  matricula: string;
  turma: Turma;
  urlFoto: string;
  responsaveis: Responsavel[];
}

export class Responsavel {
  codigo: number;
  nome: string;
  cpf: string;
  email: string;
  celular: string;
  telefone: string;
  parentesco: string;


  constructor (codigo?: number, nome?: string, cpf?: string, email?: string, celular?: string, telefone?: string, parentesco?: string ) {
    this.codigo = codigo;
    this.nome = nome;
    this.cpf = cpf;
    this.email = email;
    this.celular = celular;
    this.telefone = telefone;
    this.parentesco = parentesco;

  }

}


export class DisciplinaTurma {
  codigoTurma: number;
  codigoDisciplina: number;
  codigoProfessor: number;
  dia: String;
  periodo: String;
}

