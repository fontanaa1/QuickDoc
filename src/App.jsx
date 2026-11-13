
import { useState } from 'react'
import {
  Home, ClipboardList, Pill, Bell, User, Plus, Heart,
  CalendarDays, Clock, Search, ChevronRight, Activity,
  FileText, Pencil, Trash2, X, Save, CheckCircle2,
  AlertCircle, Phone, Mail, Droplets, Calendar,
  Stethoscope, AlarmClock, Check, RotateCcw
} from 'lucide-react'
import './App.css'

const carregar = (chave, padrao) => {
  try {
    return JSON.parse(localStorage.getItem(chave)) ?? padrao
  } catch {
    return padrao
  }
}

const salvar = (chave, dados) => {
  localStorage.setItem(chave, JSON.stringify(dados))
}

const hoje = () => new Date().toISOString().slice(0, 10)

const dataBR = data => {
  if (!data) return 'Não informada'
  return new Date(`${data}T12:00:00`).toLocaleDateString('pt-BR')
}

const novoId = () => crypto.randomUUID()

function App() {
  const [pagina, setPagina] = useState('Início')

  const [prontuarios, setProntuarios] = useState(
    () => carregar('quickdoc_prontuarios', [])
  )

  const [medicamentos, setMedicamentos] = useState(
    () => carregar('quickdoc_medicamentos', [])
  )

  const [lembretes, setLembretes] = useState(
    () => carregar('quickdoc_lembretes', [])
  )

  const [perfil, setPerfil] = useState(
    () => carregar('quickdoc_perfil', {
      nome: '',
      nascimento: '',
      email: '',
      telefone: '',
      sangue: '',
      alergias: '',
      emergencia: ''
    })
  )

  const [busca, setBusca] = useState('')
  const [formAberto, setFormAberto] = useState(false)
  const [editando, setEditando] = useState(null)

  const [form, setForm] = useState({
    titulo: '',
    categoria: 'Exame',
    medico: '',
    data: '',
    descricao: ''
  })

  const [medForm, setMedForm] = useState({
    nome: '',
    dosagem: '',
    frequencia: '1 vez ao dia',
    horario: '',
    inicio: hoje(),
    termino: '',
    observacoes: ''
  })

  const [lembForm, setLembForm] = useState({
    titulo: '',
    tipo: 'Consulta',
    data: hoje(),
    horario: '',
    descricao: ''
  })

  const [perfilForm, setPerfilForm] = useState(perfil)

  const [filtro, setFiltro] = useState('Todos')

  const menu = [
    { nome: 'Início', icon: Home },
    { nome: 'Prontuários', icon: ClipboardList },
    { nome: 'Medicamentos', icon: Pill },
    { nome: 'Lembretes', icon: Bell },
    { nome: 'Meu perfil', icon: User }
  ]

  // PERSISTÊNCIA

  function atualizarProntuarios(lista) {
    setProntuarios(lista)
    salvar('quickdoc_prontuarios', lista)
  }

  function atualizarMedicamentos(lista) {
    setMedicamentos(lista)
    salvar('quickdoc_medicamentos', lista)
  }

  function atualizarLembretes(lista) {
    setLembretes(lista)
    salvar('quickdoc_lembretes', lista)
  }

  // PRONTUÁRIOS

  function salvarProntuario(e) {
    e.preventDefault()

    const lista = editando
      ? prontuarios.map(item =>
          item.id === editando ? { ...form, id: editando } : item
        )
      : [...prontuarios, { ...form, id: novoId() }]

    atualizarProntuarios(lista)
    setFormAberto(false)
    setEditando(null)
    setForm({
      titulo: '',
      categoria: 'Exame',
      medico: '',
      data: '',
      descricao: ''
    })
  }

  function editarProntuario(item) {
    setForm({
      titulo: item.titulo,
      categoria: item.categoria,
      medico: item.medico,
      data: item.data,
      descricao: item.descricao
    })
    setEditando(item.id)
    setFormAberto(true)
  }

  function excluirProntuario(id) {
    if (!confirm('Deseja excluir este prontuário?')) return
    atualizarProntuarios(prontuarios.filter(i => i.id !== id))
  }

  // MEDICAMENTOS

  function salvarMedicamento(e) {
    e.preventDefault()

    const lista = editando
      ? medicamentos.map(item =>
          item.id === editando
            ? { ...medForm, id: editando, tomado: item.tomado || false }
            : item
        )
      : [
          ...medicamentos,
          { ...medForm, id: novoId(), tomado: false }
        ]

    atualizarMedicamentos(lista)
    setFormAberto(false)
    setEditando(null)
    setMedForm({
      nome: '',
      dosagem: '',
      frequencia: '1 vez ao dia',
      horario: '',
      inicio: hoje(),
      termino: '',
      observacoes: ''
    })
  }

  function editarMedicamento(item) {
    setMedForm({
      nome: item.nome,
      dosagem: item.dosagem,
      frequencia: item.frequencia,
      horario: item.horario,
      inicio: item.inicio,
      termino: item.termino,
      observacoes: item.observacoes
    })
    setEditando(item.id)
    setFormAberto(true)
  }

  function excluirMedicamento(id) {
    if (!confirm('Deseja excluir este medicamento?')) return
    atualizarMedicamentos(medicamentos.filter(i => i.id !== id))
  }

  function alternarDose(id) {
    atualizarMedicamentos(medicamentos.map(item =>
      item.id === id
        ? { ...item, tomado: !item.tomado }
        : item
    ))
  }

  // LEMBRETES

  function salvarLembrete(e) {
    e.preventDefault()

    const lista = editando
      ? lembretes.map(item =>
          item.id === editando ? { ...lembForm, id: editando, concluido: item.concluido || false } : item
        )
      : [
          ...lembretes,
          { ...lembForm, id: novoId(), concluido: false }
        ]

    atualizarLembretes(lista)
    setFormAberto(false)
    setEditando(null)
    setLembForm({
      titulo: '',
      tipo: 'Consulta',
      data: hoje(),
      horario: '',
      descricao: ''
    })
  }

  function editarLembrete(item) {
    setLembForm({
      titulo: item.titulo,
      tipo: item.tipo,
      data: item.data,
      horario: item.horario,
      descricao: item.descricao
    })
    setEditando(item.id)
    setFormAberto(true)
  }

  function excluirLembrete(id) {
    if (!confirm('Deseja excluir este lembrete?')) return
    atualizarLembretes(lembretes.filter(i => i.id !== id))
  }

  function concluirLembrete(id) {
    atualizarLembretes(lembretes.map(item =>
      item.id === id ? { ...item, concluido: !item.concluido } : item
    ))
  }

  // PERFIL

  function salvarPerfil(e) {
    e.preventDefault()
    setPerfil(perfilForm)
    salvar('quickdoc_perfil', perfilForm)
    alert('Perfil atualizado com sucesso!')
  }

  // CONTROLES GERAIS

  function abrirNovo() {
    setEditando(null)
    setFormAberto(true)
    setForm({
      titulo: '',
      categoria: 'Exame',
      medico: '',
      data: '',
      descricao: ''
    })
    setMedForm({
      nome: '',
      dosagem: '',
      frequencia: '1 vez ao dia',
      horario: '',
      inicio: hoje(),
      termino: '',
      observacoes: ''
    })
    setLembForm({
      titulo: '',
      tipo: 'Consulta',
      data: hoje(),
      horario: '',
      descricao: ''
    })
  }

  function cancelarForm() {
    setFormAberto(false)
    setEditando(null)
  }

  const filtrados = prontuarios.filter(item =>
    `${item.titulo} ${item.categoria} ${item.medico}`
      .toLowerCase().includes(busca.toLowerCase())
  )

  const medicamentosFiltrados = medicamentos.filter(item =>
    `${item.nome} ${item.dosagem}`
      .toLowerCase().includes(busca.toLowerCase())
  )

  const lembretesFiltrados = lembretes
    .filter(item =>
      `${item.titulo} ${item.tipo}`
        .toLowerCase().includes(busca.toLowerCase())
    )
    .filter(item =>
      filtro === 'Todos' ? true :
      filtro === 'Pendentes' ? !item.concluido :
      item.concluido
    )
    .sort((a, b) =>
      `${a.data} ${a.horario}`.localeCompare(`${b.data} ${b.horario}`)
    )

  const proximos = lembretes
    .filter(item => !item.concluido && item.data >= hoje())
    .sort((a, b) =>
      `${a.data} ${a.horario}`.localeCompare(`${b.data} ${b.horario}`)
    )
    .slice(0, 4)

  const nome = perfil.nome || 'Visitante'

  function irPara(destino) {
    setPagina(destino)
    setBusca('')
    setFormAberto(false)
    setEditando(null)
  }

  return (
    <div className="app">

      {/* MENU LATERAL */}

      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon"><Heart size={25} /></div>
          <div>
            <h2>QuickDoc</h2>
            <span>SAÚDE E CUIDADO</span>
          </div>
        </div>

        <p className="menu-label">MENU PRINCIPAL</p>

        <nav>
          {menu.map(item => {
            const Icon = item.icon
            return (
              <button
                key={item.nome}
                className={pagina === item.nome ? 'nav-item active' : 'nav-item'}
                onClick={() => irPara(item.nome)}
              >
                <Icon size={19} />
                {item.nome}
                {pagina === item.nome && <ChevronRight size={17} />}
              </button>
            )
          })}
        </nav>

        <div className="sidebar-footer">
          <Heart size={17} />
          <span>Cuide de você. Sempre.</span>
        </div>
      </aside>

      {/* CONTEÚDO */}

      <main className="main">

        <header className="topbar">
          <div>
            <span className="welcome">SEU ESPAÇO DE SAÚDE</span>
            <h1>{pagina}</h1>
          </div>

          <div className="profile">
            <div className="avatar">
              {perfil.nome ? perfil.nome.charAt(0).toUpperCase() : 'L'}
            </div>
            <div>
              <strong>{perfil.nome || 'Meu perfil'}</strong>
              <span>Bem-vinda!</span>
            </div>
          </div>
        </header>

        {/* INÍCIO */}

        {pagina === 'Início' && (
          <>
            <section className="hero">
              <div>
                <span className="hero-tag">♡ SEU BEM-ESTAR EM PRIMEIRO LUGAR</span>
                <h2>Olá, {nome.split(' ')[0]}! Vamos cuidar<br />da sua saúde?</h2>
                <p>
                  Organize seus exames, medicamentos e<br />
                  acompanhe seus cuidados em um só lugar.
                </p>
                <button className="hero-button" onClick={() => irPara('Prontuários')}>
                  Acessar prontuários <ChevronRight size={17} />
                </button>
              </div>
              <div className="hero-decoration"><Heart size={100} /></div>
            </section>

            <section className="section-heading">
              <div>
                <h2>Seu painel de saúde</h2>
                <p>Uma visão geral dos seus cuidados.</p>
              </div>
            </section>

            <section className="stats">
              <article className="stat-card">
                <div className="stat-icon blue"><ClipboardList /></div>
                <span>Prontuários</span>
                <strong>{prontuarios.length}</strong>
                <small>Documentos registrados</small>
              </article>

              <article className="stat-card">
                <div className="stat-icon green"><Pill /></div>
                <span>Medicamentos</span>
                <strong>{medicamentos.length}</strong>
                <small>Em acompanhamento</small>
              </article>

              <article className="stat-card">
                <div className="stat-icon orange"><Bell /></div>
                <span>Lembretes</span>
                <strong>{lembretes.filter(i => !i.concluido).length}</strong>
                <small>Cuidados pendentes</small>
              </article>
            </section>

            <section className="bottom-grid">
              <article className="panel">
                <div className="panel-heading">
                  <div>
                    <h3>Próximos cuidados</h3>
                    <p>Seus compromissos de saúde.</p>
                  </div>
                  <CalendarDays color="#079BB5" />
                </div>

                {proximos.length === 0 ? (
                  <div className="empty">
                    <Clock size={30} />
                    <strong>Nenhum cuidado agendado</strong>
                    <span>Seus próximos lembretes aparecerão aqui.</span>
                  </div>
                ) : proximos.map(item => (
                  <div className="upcoming-item" key={item.id}>
                    <Calendar size={20} />
                    <div>
                      <strong>{item.titulo}</strong>
                      <span>{dataBR(item.data)} · {item.horario || 'Horário não informado'}</span>
                    </div>
                  </div>
                ))}

                <button className="text-button" onClick={() => irPara('Lembretes')}>
                  Ver todos os lembretes <ChevronRight size={16} />
                </button>
              </article>

              <article className="panel quick-actions">
                <h3>Acesso rápido</h3>
                <p>O que deseja fazer?</p>
                <button onClick={() => { irPara('Prontuários'); abrirNovo() }}>
                  <ClipboardList /> Adicionar prontuário <ChevronRight />
                </button>
                <button onClick={() => { irPara('Medicamentos'); abrirNovo() }}>
                  <Pill /> Cadastrar medicamento <ChevronRight />
                </button>
                <button onClick={() => { irPara('Lembretes'); abrirNovo() }}>
                  <Bell /> Criar lembrete <ChevronRight />
                </button>
              </article>
            </section>
          </>
        )}

        {/* PRONTUÁRIOS */}

        {pagina === 'Prontuários' && (
          <section className="records-page">
            <div className="records-heading">
              <div>
                <h2>Meus prontuários</h2>
                <p>Organize seus exames, consultas e documentos médicos.</p>
              </div>
              <button className="primary-button" onClick={abrirNovo}>
                <Plus size={18} /> Novo prontuário
              </button>
            </div>

            {formAberto && (
              <form className="record-form" onSubmit={salvarProntuario}>
                <div className="form-title">
                  <h3>{editando ? 'Editar prontuário' : 'Cadastrar prontuário'}</h3>
                  <button type="button" className="close-form" onClick={cancelarForm}><X /></button>
                </div>

                <label>Título do registro</label>
                <input required value={form.titulo} placeholder="Ex: Hemograma completo"
                  onChange={e => setForm({ ...form, titulo: e.target.value })} />

                <div className="form-grid">
                  <div>
                    <label>Categoria</label>
                    <select value={form.categoria}
                      onChange={e => setForm({ ...form, categoria: e.target.value })}>
                      <option>Exame</option><option>Consulta</option>
                      <option>Receita</option><option>Vacina</option><option>Outro</option>
                    </select>
                  </div>
                  <div>
                    <label>Data</label>
                    <input type="date" required value={form.data}
                      onChange={e => setForm({ ...form, data: e.target.value })} />
                  </div>
                </div>

                <label>Médico ou profissional</label>
                <input value={form.medico} placeholder="Nome do profissional"
                  onChange={e => setForm({ ...form, medico: e.target.value })} />

                <label>Descrição</label>
                <textarea value={form.descricao} placeholder="Observações sobre o registro..."
                  onChange={e => setForm({ ...form, descricao: e.target.value })} />

                <div className="form-actions">
                  <button type="button" className="cancel-button" onClick={cancelarForm}>Cancelar</button>
                  <button className="primary-button"><Save size={17} /> Salvar prontuário</button>
                </div>
              </form>
            )}

            <div className="records-search">
              <Search size={19} />
              <input value={busca} onChange={e => setBusca(e.target.value)}
                placeholder="Pesquisar prontuários..." />
            </div>

            <div className="records-count">{filtrados.length} registro(s) encontrado(s)</div>

            <div className="records-list">
              {filtrados.length === 0 ? (
                <div className="empty-records">
                  <FileText size={42} />
                  <h3>Nenhum prontuário cadastrado</h3>
                  <p>Comece adicionando seu primeiro registro médico.</p>
                  <button className="primary-button" onClick={abrirNovo}>
                    <Plus size={17} /> Adicionar prontuário
                  </button>
                </div>
              ) : filtrados.map(item => (
                <article className="record-card" key={item.id}>
                  <div className="stat-icon blue"><ClipboardList /></div>
                  <div className="record-info">
                    <h3>{item.titulo}</h3>
                    <span>{item.categoria} · {dataBR(item.data)}</span>
                    <p>{item.medico || 'Profissional não informado'}</p>
                    {item.descricao && <small>{item.descricao}</small>}
                  </div>
                  <div className="record-actions">
                    <button onClick={() => editarProntuario(item)} title="Editar"><Pencil /></button>
                    <button className="delete-action" onClick={() => excluirProntuario(item.id)} title="Excluir"><Trash2 /></button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* MEDICAMENTOS */}

        {pagina === 'Medicamentos' && (
          <section className="records-page">
            <div className="records-heading">
              <div>
                <h2>Meus medicamentos</h2>
                <p>Organize seus tratamentos e acompanhe suas doses.</p>
              </div>
              <button className="primary-button" onClick={abrirNovo}>
                <Plus size={18} /> Novo medicamento
              </button>
            </div>

            {formAberto && (
              <form className="record-form" onSubmit={salvarMedicamento}>
                <div className="form-title">
                  <h3>{editando ? 'Editar medicamento' : 'Cadastrar medicamento'}</h3>
                  <button type="button" className="close-form" onClick={cancelarForm}><X /></button>
                </div>

                <label>Nome do medicamento</label>
                <input required value={medForm.nome} placeholder="Ex: Vitamina C"
                  onChange={e => setMedForm({ ...medForm, nome: e.target.value })} />

                <div className="form-grid">
                  <div>
                    <label>Dosagem</label>
                    <input required value={medForm.dosagem} placeholder="Ex: 500 mg"
                      onChange={e => setMedForm({ ...medForm, dosagem: e.target.value })} />
                  </div>
                  <div>
                    <label>Frequência</label>
                    <select value={medForm.frequencia}
                      onChange={e => setMedForm({ ...medForm, frequencia: e.target.value })}>
                      <option>1 vez ao dia</option>
                      <option>2 vezes ao dia</option>
                      <option>3 vezes ao dia</option>
                      <option>4 vezes ao dia</option>
                      <option>Conforme orientação médica</option>
                    </select>
                  </div>
                </div>

                <div className="form-grid">
                  <div>
                    <label>Horário</label>
                    <input type="time" value={medForm.horario}
                      onChange={e => setMedForm({ ...medForm, horario: e.target.value })} />
                  </div>
                  <div>
                    <label>Data de início</label>
                    <input type="date" required value={medForm.inicio}
                      onChange={e => setMedForm({ ...medForm, inicio: e.target.value })} />
                  </div>
                </div>

                <label>Data de término (opcional)</label>
                <input type="date" value={medForm.termino}
                  min={medForm.inicio}
                  onChange={e => setMedForm({ ...medForm, termino: e.target.value })} />

                <label>Observações</label>
                <textarea value={medForm.observacoes} placeholder="Orientações e observações..."
                  onChange={e => setMedForm({ ...medForm, observacoes: e.target.value })} />

                <div className="form-actions">
                  <button type="button" className="cancel-button" onClick={cancelarForm}>Cancelar</button>
                  <button className="primary-button"><Save size={17} /> Salvar medicamento</button>
                </div>
              </form>
            )}

            <div className="records-search">
              <Search size={19} />
              <input value={busca} onChange={e => setBusca(e.target.value)}
                placeholder="Pesquisar medicamentos..." />
            </div>

            <div className="records-count">{medicamentosFiltrados.length} medicamento(s) cadastrado(s)</div>

            <div className="records-list">
              {medicamentosFiltrados.length === 0 ? (
                <div className="empty-records">
                  <Pill size={42} />
                  <h3>Nenhum medicamento cadastrado</h3>
                  <p>Adicione seus medicamentos para organizar seus cuidados.</p>
                  <button className="primary-button" onClick={abrirNovo}><Plus size={17} /> Cadastrar medicamento</button>
                </div>
              ) : medicamentosFiltrados.map(item => (
                <article className="record-card" key={item.id}>
                  <div className="stat-icon green"><Pill /></div>
                  <div className="record-info">
                    <h3>{item.nome}</h3>
                    <span>{item.dosagem} · {item.frequencia}</span>
                    <p><Clock size={13} /> {item.horario || 'Horário não definido'}</p>
                    <small>Início: {dataBR(item.inicio)} {item.termino ? `· Término: ${dataBR(item.termino)}` : ''}</small>
                    {item.observacoes && <small>{item.observacoes}</small>}
                    <button className="dose-button" onClick={() => alternarDose(item.id)}>
                      {item.tomado ? <><CheckCircle2 size={16} /> Dose marcada como tomada</> : <><Check size={16} /> Marcar dose como tomada</>}
                    </button>
                  </div>
                  <div className="record-actions">
                    <button onClick={() => editarMedicamento(item)} title="Editar"><Pencil /></button>
                    <button className="delete-action" onClick={() => excluirMedicamento(item.id)} title="Excluir"><Trash2 /></button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* LEMBRETES */}

        {pagina === 'Lembretes' && (
          <section className="records-page">
            <div className="records-heading">
              <div>
                <h2>Meus lembretes</h2>
                <p>Não se esqueça dos seus compromissos de saúde.</p>
              </div>
              <button className="primary-button" onClick={abrirNovo}>
                <Plus size={18} /> Novo lembrete
              </button>
            </div>

            {formAberto && (
              <form className="record-form" onSubmit={salvarLembrete}>
                <div className="form-title">
                  <h3>{editando ? 'Editar lembrete' : 'Cadastrar lembrete'}</h3>
                  <button type="button" className="close-form" onClick={cancelarForm}><X /></button>
                </div>

                <label>Nome do compromisso</label>
                <input required value={lembForm.titulo} placeholder="Ex: Consulta com cardiologista"
                  onChange={e => setLembForm({ ...lembForm, titulo: e.target.value })} />

                <div className="form-grid">
                  <div>
                    <label>Tipo de compromisso</label>
                    <select value={lembForm.tipo}
                      onChange={e => setLembForm({ ...lembForm, tipo: e.target.value })}>
                      <option>Consulta</option>
                      <option>Exame</option>
                      <option>Medicamento</option>
                      <option>Retorno médico</option>
                      <option>Vacina</option>
                      <option>Outro</option>
                    </select>
                  </div>
                  <div>
                    <label>Data</label>
                    <input type="date" required min={hoje()} value={lembForm.data}
                      onChange={e => setLembForm({ ...lembForm, data: e.target.value })} />
                  </div>
                </div>

                <label>Horário</label>
                <input type="time" value={lembForm.horario}
                  onChange={e => setLembForm({ ...lembForm, horario: e.target.value })} />

                <label>Descrição</label>
                <textarea value={lembForm.descricao} placeholder="Informações adicionais..."
                  onChange={e => setLembForm({ ...lembForm, descricao: e.target.value })} />

                <div className="form-actions">
                  <button type="button" className="cancel-button" onClick={cancelarForm}>Cancelar</button>
                  <button className="primary-button"><Save size={17} /> Salvar lembrete</button>
                </div>
              </form>
            )}

            <div className="records-search">
              <Search size={19} />
              <input value={busca} onChange={e => setBusca(e.target.value)}
                placeholder="Pesquisar compromissos..." />
            </div>

            <div className="filter-tabs">
              {['Todos', 'Pendentes', 'Concluídos'].map(opcao => (
                <button key={opcao}
                  className={filtro === opcao ? 'filter-active' : ''}
                  onClick={() => setFiltro(opcao)}>
                  {opcao}
                </button>
              ))}
            </div>

            <div className="records-count">{lembretesFiltrados.length} compromisso(s) encontrado(s)</div>

            <div className="records-list">
              {lembretesFiltrados.length === 0 ? (
                <div className="empty-records">
                  <Bell size={42} />
                  <h3>Nenhum lembrete encontrado</h3>
                  <p>Organize suas consultas, exames e compromissos.</p>
                  <button className="primary-button" onClick={abrirNovo}><Plus size={17} /> Criar lembrete</button>
                </div>
              ) : lembretesFiltrados.map(item => (
                <article className="record-card" key={item.id}>
                  <div className="stat-icon orange"><CalendarDays /></div>
                  <div className="record-info">
                    <h3>{item.titulo}</h3>
                    <span>{item.tipo}</span>
                    <p><Calendar size={13} /> {dataBR(item.data)} · {item.horario || 'Horário não definido'}</p>
                    {item.descricao && <small>{item.descricao}</small>}
                    <span className={item.concluido ? 'status-done' : 'status-pending'}>
                      {item.concluido ? 'Concluído' : 'Pendente'}
                    </span>
                  </div>
                  <div className="record-actions">
                    <button onClick={() => concluirLembrete(item.id)} title="Concluir ou reabrir">
                      {item.concluido ? <RotateCcw /> : <Check />}
                    </button>
                    <button onClick={() => editarLembrete(item)} title="Editar"><Pencil /></button>
                    <button className="delete-action" onClick={() => excluirLembrete(item.id)} title="Excluir"><Trash2 /></button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* MEU PERFIL */}

        {pagina === 'Meu perfil' && (
          <section className="records-page">
            <div className="records-heading">
              <div>
                <h2>Meu perfil de saúde</h2>
                <p>Gerencie suas informações pessoais e dados importantes.</p>
              </div>
            </div>

            <form className="record-form" onSubmit={salvarPerfil}>
              <div className="profile-header">
                <div className="profile-large">
                  {perfilForm.nome ? perfilForm.nome.charAt(0).toUpperCase() : 'L'}
                </div>
                <div>
                  <h3>{perfilForm.nome || 'Seu nome'}</h3>
                  <p>Informações pessoais</p>
                </div>
              </div>

              <h3 className="profile-section-title">Dados pessoais</h3>

              <div className="form-grid">
                <div>
                  <label>Nome completo</label>
                  <input required value={perfilForm.nome}
                    placeholder="Seu nome completo"
                    onChange={e => setPerfilForm({ ...perfilForm, nome: e.target.value })} />
                </div>
                <div>
                  <label>Data de nascimento</label>
                  <input type="date" value={perfilForm.nascimento}
                    onChange={e => setPerfilForm({ ...perfilForm, nascimento: e.target.value })} />
                </div>
              </div>

              <div className="form-grid">
                <div>
                  <label>E-mail</label>
                  <input type="email" value={perfilForm.email}
                    placeholder="seu@email.com"
                    onChange={e => setPerfilForm({ ...perfilForm, email: e.target.value })} />
                </div>
                <div>
                  <label>Telefone</label>
                  <input type="tel" value={perfilForm.telefone}
                    placeholder="(00) 00000-0000"
                    onChange={e => setPerfilForm({ ...perfilForm, telefone: e.target.value })} />
                </div>
              </div>

              <h3 className="profile-section-title">Informações de saúde</h3>

              <div className="form-grid">
                <div>
                  <label>Tipo sanguíneo</label>
                  <select value={perfilForm.sangue}
                    onChange={e => setPerfilForm({ ...perfilForm, sangue: e.target.value })}>
                    <option value="">Selecione</option>
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(v => <option key={v}>{v}</option>)}
                  </select>
                </div>
                <div>
                  <label>Contato de emergência</label>
                  <input value={perfilForm.emergencia}
                    placeholder="Nome e telefone"
                    onChange={e => setPerfilForm({ ...perfilForm, emergencia: e.target.value })} />
                </div>
              </div>

              <label>Alergias e observações importantes</label>
              <textarea value={perfilForm.alergias}
                placeholder="Informe alergias conhecidas ou outras observações..."
                onChange={e => setPerfilForm({ ...perfilForm, alergias: e.target.value })} />

              <div className="form-actions">
                <button className="primary-button"><Save size={17} /> Salvar meu perfil</button>
              </div>
            </form>

            <div className="panel profile-summary">
              <AlertCircle size={20} />
              <div>
                <strong>Importante</strong>
                <p>Estas informações são armazenadas localmente nesta versão. Em uma emergência, procure atendimento médico e não dependa apenas do aplicativo.</p>
              </div>
            </div>
          </section>
        )}

        <footer>QuickDoc © 2026 · Sua saúde merece atenção.</footer>

      </main>
    </div>
  )
}

export default App
