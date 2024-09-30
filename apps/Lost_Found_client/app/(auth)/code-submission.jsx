import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; 

const CodeSubmission = () => { 
  const [code, setCode] = useState(['', '', '', '', '', '']); 
  const inputRefs = useRef([]);
  const router = useRouter();

  const handleCodeChange = (text, index) => {
    let newCode = [...code];
    newCode[index] = text;
    if (text.length === 1 && index < 5) {
      inputRefs.current[index + 1].focus();
    }
    setCode(newCode);
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmitCode = () => {
    const enteredCode = code.join('');
    console.log('Code entered:', enteredCode); //temporary
    if (enteredCode === '123456') {
      router.replace('/(tabs)/welcome'); // Move to the profile
    }
  };

  const handleResendCode = () => {
    console.log('Resend Code Pressed'); //temporary
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Enter the sent code</Text>
        <View style={styles.card}>
          <Text style={styles.subtitle}>Check your email for the code.</Text>
          <View style={styles.codeInputContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                value={digit}
                onChangeText={(text) => handleCodeChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                maxLength={1}
                keyboardType="numeric"
                style={styles.codeInput}
                textAlign="center"
                autoFocus={index === 0}
              />
            ))}
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmitCode}>
          <Text style={styles.buttonText}>Submit Code</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleResendCode}>
          <Text style={styles.resendText}>Resend</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#93a6e4',
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center', 
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10, 
    marginTop: 20,
  },
  card: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    
  },
  subtitle: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 20, 
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20, 
  },
  codeInput: {
    width: 40,
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 18,
    color: '#fff',
    marginRight: 10,
    textAlign: 'center', 
  },
  button: {
    width: '80%',
    backgroundColor: '#7286D3',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  resendText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 10,
    textDecorationLine: 'underline', 
  },
});


export default CodeSubmission