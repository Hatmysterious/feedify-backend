const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Verifica se o usuário já existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // Criptografa a senha
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    // Cria o novo usuário
    const newUser = new User({
      nome,
      email,
      senha: senhaHash,
    });

    await newUser.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Verifica se o usuário existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    // Verifica a senha
    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    // Gera o token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token, user: { id: user._id, nome: user.nome, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
