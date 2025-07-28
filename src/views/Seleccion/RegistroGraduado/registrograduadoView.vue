<template>
  <header>
    <div class="container">
      <div class="header-content">
        <div class="logo">ULEAM Jobs</div>
      </div>
    </div>
  </header>
  <div class="container">
    <div class="main-content">
      <h1 class="form-title">Registro de Graduados</h1>
      <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <form @submit.prevent="handleSubmit">
        <!-- Datos Personales -->
        <div class="form-section">
          <div class="section-title">Datos Personales</div>
          <div class="form-row">
            <div class="form-group">
              <label for="nombres">Nombres <span class="required">*</span></label>
              <input type="text" id="nombres" v-model="form.nombres" required>
            </div>
            <div class="form-group">
              <label for="apellidos">Apellidos <span class="required">*</span></label>
              <input type="text" id="apellidos" v-model="form.apellidos" required>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="cedula">Cédula de Identidad <span class="required">*</span></label>
              <input type="text" id="cedula" v-model="form.cedula" maxlength="10" required @input="onlyNumbers('cedula')">
            </div>
            <div class="form-group">
              <label for="fechaNacimiento">Fecha de Nacimiento <span class="required">*</span></label>
              <input type="date" id="fechaNacimiento" v-model="form.fechaNacimiento" required>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="genero">Género <span class="required">*</span></label>
              <select id="genero" v-model="form.genero" required>
                <option value="">Seleccione...</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Prefiero no especificar</option>
              </select>
            </div>
            <div class="form-group">
              <label for="telefono">Teléfono de Contacto <span class="required">*</span></label>
              <input type="tel" id="telefono" v-model="form.telefono" maxlength="10" required @input="onlyNumbers('telefono')">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="ciudad">Ciudad de Residencia <span class="required">*</span></label>
              <input type="text" id="ciudad" v-model="form.ciudad" required>
            </div>
            <div class="form-group full-width">
              <label for="direccion">Dirección</label>
              <input type="text" id="direccion" v-model="form.direccion">
            </div>
          </div>
        </div>
        <!-- Datos de Acceso -->
        <div class="form-section">
          <div class="section-title">Datos de Acceso</div>
          <div class="form-row">
            <div class="form-group">
              <label for="emailInstitucional">Correo Institucional <span class="required">*</span></label>
              <input type="email" id="emailInstitucional" v-model="form.emailInstitucional" required @input="validateEmailInstitucional">
              <div class="password-requirements">Debe terminar en @live.uleam.edu.ec</div>
            </div>
            <div class="form-group">
              <label for="emailPersonal">Correo Personal <span class="required">*</span></label>
              <input type="email" id="emailPersonal" v-model="form.emailPersonal" required>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="password">Contraseña <span class="required">*</span></label>
              <input type="password" id="password" v-model="form.password" required>
              <div class="password-requirements">
                Mínimo 8 caracteres, al menos una mayúscula, una minúscula y un número
              </div>
            </div>
            <div class="form-group">
              <label for="confirmPassword">Confirmar Contraseña <span class="required">*</span></label>
              <input type="password" id="confirmPassword" v-model="form.confirmPassword" required @input="validatePasswordMatch">
            </div>
          </div>
        </div>
        <!-- Datos Académicos -->
        <div class="form-section">
          <div class="section-title">Datos Académicos</div>
          <div class="form-row">
            <div class="form-group">
              <label for="facultad">Facultad <span class="required">*</span></label>
              <select id="facultad" v-model="form.facultad" required>
                <option value="">Seleccione...</option>
                <option value="sistemas">Facultad de Ciencias Informáticas</option>
                <option value="administracion">Facultad de Administración</option>
                <option value="ingenieria">Facultad de Ingeniería</option>
                <option value="educacion">Facultad de Educación</option>
                <option value="medicina">Facultad de Medicina</option>
              </select>
            </div>
            <div class="form-group">
              <label for="carrera">Carrera <span class="required">*</span></label>
              <input type="text" id="carrera" v-model="form.carrera" required>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="anoGraduacion">Año de Graduación <span class="required">*</span></label>
              <select id="anoGraduacion" v-model="form.anoGraduacion" required>
                <option value="">Seleccione...</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
              </select>
            </div>
            <div class="form-group">
              <label for="numeroTitulo">Número de Registro de Título</label>
              <input type="text" id="numeroTitulo" v-model="form.numeroTitulo">
            </div>
          </div>
        </div>
        <!-- Verificación -->
        <div class="form-section">
          <div class="section-title">Verificación</div>
          <div class="captcha-container">
            <label>Ingrese el código de verificación:</label>
            <div class="captcha-box">{{ captchaCode }}</div>
            <button type="button" class="refresh-captcha" @click="refreshCaptcha">🔄</button>
            <input type="text" v-model="captchaInput" placeholder="Ingrese el código" required>
          </div>
          <div class="terms-container">
            <input type="checkbox" id="acceptTerms" v-model="form.acceptTerms" required>
            <label for="acceptTerms">
              Acepto los <a href="#" target="_blank">términos y condiciones</a> y la <a href="#" target="_blank">política de privacidad</a> de ULEAM Jobs
            </label>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Registrarse como Graduado</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegistroGraduadoView',
  data() {
    return {
      form: {
        nombres: '',
        apellidos: '',
        cedula: '',
        fechaNacimiento: '',
        genero: '',
        telefono: '',
        ciudad: '',
        direccion: '',
        emailInstitucional: '',
        emailPersonal: '',
        password: '',
        confirmPassword: '',
        facultad: '',
        carrera: '',
        anoGraduacion: '',
        numeroTitulo: '',
        acceptTerms: false,
      },
      captchaCode: '',
      captchaInput: '',
      successMessage: '',
      errorMessage: '',
    };
  },
  mounted() {
    this.refreshCaptcha();
  },
  methods: {
    generateCaptcha() {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';
      for (let i = 0; i < 5; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    },
    refreshCaptcha() {
      this.captchaCode = this.generateCaptcha();
      this.captchaInput = '';
    },
    validatePassword(password) {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
      return regex.test(password);
    },
    validateCedula(cedula) {
      if (cedula.length !== 10) return false;
      const digits = cedula.split('').map(Number);
      const province = parseInt(cedula.substring(0, 2));
      if (province < 1 || province > 24) return false;
      const coefficients = [2, 1, 2, 1, 2, 1, 2, 1, 2];
      let sum = 0;
      for (let i = 0; i < coefficients.length; i++) {
        let result = digits[i] * coefficients[i];
        if (result >= 10) result -= 9;
        sum += result;
      }
      const checkDigit = (Math.ceil(sum / 10) * 10) - sum;
      return checkDigit === digits[9];
    },
    showMessage(type, message) {
      this.successMessage = type === 'success' ? message : '';
      this.errorMessage = type === 'error' ? message : '';
      this.$nextTick(() => {
        const el = this.$el.querySelector('.main-content');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      });
    },
    handleSubmit() {
      const data = { ...this.form };
      // Validaciones
      if (!this.validateCedula(data.cedula)) {
        this.showMessage('error', 'La cédula ingresada no es válida.');
        return;
      }
      if (!this.validatePassword(data.password)) {
        this.showMessage('error', 'La contraseña no cumple con los requisitos de seguridad.');
        return;
      }
      if (data.password !== data.confirmPassword) {
        this.showMessage('error', 'Las contraseñas no coinciden.');
        return;
      }
      if (!data.emailInstitucional.includes('@live.uleam.edu.ec')) {
        this.showMessage('error', 'El correo institucional debe terminar en @live.uleam.edu.ec');
        return;
      }
      if (this.captchaCode !== this.captchaInput.toUpperCase()) {
        this.showMessage('error', 'El código de verificación es incorrecto.');
        this.refreshCaptcha();
        return;
      }
      if (!data.acceptTerms) {
        this.showMessage('error', 'Debe aceptar los términos y condiciones.');
        return;
      }
      // Simular guardado en localStorage
      try {
        const existingGraduados = JSON.parse(localStorage.getItem('graduados_uleam') || '[]');
        const exists = existingGraduados.some(grad =>
          grad.emailInstitucional === data.emailInstitucional ||
          grad.emailPersonal === data.emailPersonal ||
          grad.cedula === data.cedula
        );
        if (exists) {
          this.showMessage('error', 'Ya existe un graduado registrado con estos datos.');
          return;
        }
        data.id = Date.now();
        data.fechaRegistro = new Date().toISOString();
        delete data.confirmPassword;
        existingGraduados.push(data);
        localStorage.setItem('graduados_uleam', JSON.stringify(existingGraduados));
        this.showMessage('success', '¡Registro exitoso! Sus datos han sido guardados correctamente.');
        setTimeout(() => {
          this.resetForm();
          this.refreshCaptcha();
        }, 2000);
      } catch (error) {
        this.showMessage('error', 'Error al guardar los datos. Intente nuevamente.');
        console.error('Error:', error);
      }
    },
    resetForm() {
      this.form = {
        nombres: '',
        apellidos: '',
        cedula: '',
        fechaNacimiento: '',
        genero: '',
        telefono: '',
        ciudad: '',
        direccion: '',
        emailInstitucional: '',
        emailPersonal: '',
        password: '',
        confirmPassword: '',
        facultad: '',
        carrera: '',
        anoGraduacion: '',
        numeroTitulo: '',
        acceptTerms: false,
      };
      this.captchaInput = '';
    },
    onlyNumbers(field) {
      this.form[field] = this.form[field].replace(/[^0-9]/g, '');
    },
    validatePasswordMatch() {
      if (this.form.confirmPassword && this.form.password !== this.form.confirmPassword) {
        this.errorMessage = 'Las contraseñas no coinciden.';
      } else {
        this.errorMessage = '';
      }
    },
    validateEmailInstitucional() {
      if (this.form.emailInstitucional && !this.form.emailInstitucional.includes('@live.uleam.edu.ec')) {
        this.errorMessage = 'Debe usar un correo institucional válido';
      } else {
        this.errorMessage = '';
      }
    }
  }
}
</script>

<style scoped src="../../../assets/css/registro.css"></style>
