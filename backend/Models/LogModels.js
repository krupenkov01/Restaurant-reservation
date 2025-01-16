import mongoose from 'mongoose';

// Схема для HTTP логов
const httpLogSchema = new mongoose.Schema({
  method: String,
  url: String,
  status: {
    type: Number,
    required: true,
    default: 0 // Установите значение по умолчанию
  },
  
  responseTime: {
    type: Number,
    required: true,
    default: 0 // Установите значение по умолчанию
  },
  timestamp: { type: Date, default: Date.now },
});

// Схема для логов операций с базой данных
const dbLogSchema = new mongoose.Schema({
  action: String,
  collection: String,
  documentId: String,
  timestamp: { type: Date, default: Date.now },
});

// Модели
const HttpLog = mongoose.model('HttpLog', httpLogSchema);   
const DbLog = mongoose.model('DbLog', dbLogSchema);

export { HttpLog, DbLog };