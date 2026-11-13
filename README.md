# 💙 QuickDoc — Saúde e Cuidado

**Organize sua saúde em um só lugar!**

O QuickDoc é um aplicativo desenvolvido para facilitar o gerenciamento de informações pessoais de saúde, permitindo organizar prontuários médicos, acompanhar medicamentos e criar lembretes de cuidados.

## 📱 Apresentação do aplicativo

O QuickDoc possui uma interface intuitiva, moderna e responsiva, com identidade visual em tons de azul-turquesa e branco.

### Telas do aplicativo

**Início**

![Tela inicial do QuickDoc](docs/images/quickdoc-inicio.png)

**Prontuários médicos**

![Prontuários do QuickDoc](docs/images/quickdoc-prontuarios.png)

**Medicamentos**

![Medicamentos do QuickDoc](docs/images/quickdoc-medicamentos.png)

**Lembretes**

![Lembretes do QuickDoc](docs/images/quickdoc-lembretes.png)

## ✨ Funcionalidades

- 🏠 Painel inicial com visão geral dos cuidados.
- 📋 Cadastro, edição, pesquisa e exclusão de prontuários.
- 💊 Cadastro e acompanhamento de medicamentos.
- 🔔 Criação e gerenciamento de lembretes.
- 👤 Gerenciamento de perfil pessoal.
- 💾 Persistência local de informações com LocalStorage.

## 🎨 Identidade visual

- Nome: QuickDoc
- Segmento: Saúde e bem-estar.
- Cores principais: Azul-turquesa e branco.
- Símbolo: Coração, representando cuidado e saúde.
- Interface: Moderna, minimalista e intuitiva.

## 🛠️ Tecnologias utilizadas

- React
- JavaScript
- Vite
- CSS
- Lucide React
- Capacitor
- Android

## 🚀 Como executar o projeto

Clone o repositório:

```bash
git clone https://github.com/SEU-USUARIO/QuickDoc.git
```

Entre na pasta:

```bash
cd QuickDoc
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

## 📲 Gerar aplicativo Android

Gere a versão de produção:

```bash
npm run build
```

Sincronize com o Android:

```bash
npx cap sync android
```

Abra o Android Studio:

```bash
npx cap open android
```

## ⚙️ Geração automática do APK

O projeto utiliza GitHub Actions para automatizar a compilação do aplicativo Android.

O workflow está localizado em:

`.github/workflows/android-build.yml`

Após uma execução bem-sucedida, o APK fica disponível no artefato:

`meu-aplicativo-apk`

## 👩‍💻 Desenvolvimento

Projeto desenvolvido como atividade acadêmica do curso de Tecnologia da Informação do SENAI.

**QuickDoc — Sua saúde merece atenção! 💙**
