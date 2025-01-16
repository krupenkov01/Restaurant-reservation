import mongoose from 'mongoose';




const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://krupenkov372:1234567890@cluster0.epxt7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB подключен');
  } catch (error) {
    console.error('Ошибка подключения к MongoDB:', error.message);
    process.exit(1);
  }
};

export default connectDB;