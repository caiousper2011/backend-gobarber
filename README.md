# Recuperação de senha

**RF**

- O usuário deve poder recuperar sua senha informando o email;
- O usuário deve receber um email com instruções de recuperação de email;
- O usuário deve poder resetar sua senha;

**RNF**

- Utilizar Mailtrap para testar envio de email em ambiente de desenvolvimento;
- Utilizar Amazon SES para envios em produção;
- O envio de email deve acontecer em segundo plano (background job);

**RN**

- O link enviado por email para recuperar senha deve expirar em 2 horas;
- O usuário precisa confiramr a nova senha ao resetar a senha;

# Atualização do perfil

**RF**

- O usuário deve poder atualizar o perfil: nome, email e senha;

**RN**

- O usuário não pode alterar o email para um email já utilizado;
- Para atulizar sua senha o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário deve confirmar a nova senha;

# Painel do prestador

**RF**

- Ele deve poder ver todos os agendamentos dele por dia;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador do dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no mongoDB;
- As notificações do prestador devem ser enviadas em tempo real utilizando Socket.io;

**RN**

- A notificação deve ter um status de lida ou não lida para que o prestador possa controlar;

# Agendamento de serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviços cadastrados;
- O usuário poderá listar os dias de um mês com pelo menos um o horário disponível de um prestador;
- O usuário poderá listar horários disponíveis em um dia específico de um prestador;
- O usuário poderá realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar 1hr exatamente;
- Os agendamentos deve estar disponíveis entre 8hr às 18hr (Primeiro às 8hr, último às 17hr);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário no passado;
- O usuário não pode agendar serviços consigo mesmo;
