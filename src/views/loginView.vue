<template>
  <div class="header">
    <h1>Uleam JOBS</h1>
    <p>Bolsa de Empleo para Graduados</p>
  </div>

  <div class="main-container">
    <div class="login-container">
      <div class="login-header">
        <h2>Iniciar Sesión</h2>
        <p>Accede a tu cuenta</p>
      </div>

      <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
      <div class="success-message" v-if="successMessage">{{ successMessage }}</div>

      <form @submit.prevent="handleLogin">
        <div class="user-type-selector">
          <button type="button" class="user-type-btn" :class="{ active: currentUserType === 'graduado' }" @click="selectUserType('graduado')">
            Graduado
          </button>
          <button type="button" class="user-type-btn" :class="{ active: currentUserType === 'empresa' }" @click="selectUserType('empresa')">
            Empresa
          </button>
        </div>

        <div class="form-group">
          <label for="email">Correo Electrónico</label>
          <input type="email" id="email" v-model="email" required placeholder="Ingresa tu correo electrónico">
        </div>

        <div class="form-group">
          <label for="password">Contraseña</label>
          <input type="password" id="password" v-model="password" required placeholder="Ingresa tu contraseña">
        </div>

        <div class="form-options">
          <div class="remember-me">
            <input type="checkbox" id="remember" v-model="remember">
            <label for="remember">Recordar contraseña</label>
          </div>
          <a href="#" class="forgot-password" @click.prevent="forgotPassword">¿Olvidaste tu contraseña?</a>
        </div>

        <button type="submit" class="btn-primary">Iniciar Sesión</button>
      </form>

      <div class="register-links">
        <p>¿No tienes una cuenta?</p>
        <div v-if="currentUserType === 'graduado'" id="graduadoRegister">
          <a href="#" @click.prevent="redirectToRegister('graduado')">Regístrate como Graduado</a>
        </div>
        <div v-if="currentUserType === 'empresa'" id="empresaRegister" style="margin-top: 10px;">
          <a href="#" @click.prevent="redirectToRegister('empresa')">Regístrate como Empresa</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      currentUserType: 'graduado',
      email: '',
      password: '',
      remember: false,
      errorMessage: '',
      successMessage: ''
    }
  },
  methods: {
    selectUserType(type) {
      this.currentUserType = type;
      this.errorMessage = '';
      this.successMessage = '';
    },
    handleLogin() {
      this.hideMessages();
      let loginSuccess = false;
      let userData = null;
      if (this.currentUserType === 'graduado') {
        let graduados = JSON.parse(localStorage.getItem('graduados')) || [];
        if (graduados.length === 0) {
          // Si no hay graduados, crea uno de prueba con los datos ingresados
          userData = {
            emailInstitucional: this.email,
            emailPersonal: this.email,
            password: this.password,
            nombre: 'Usuario de Prueba'
          };
          graduados.push(userData);
          localStorage.setItem('graduados', JSON.stringify(graduados));
          loginSuccess = true;
        } else {
          userData = graduados.find(grad =>
            (grad.emailInstitucional === this.email || grad.emailPersonal === this.email) &&
            grad.password === this.password
          );
          loginSuccess = !!userData;
        }
      } else {
        let empresas = JSON.parse(localStorage.getItem('empresas')) || [];
        if (empresas.length === 0) {
          // Si no hay empresas, crea una de prueba con los datos ingresados
          userData = {
            emailCorporativo: this.email,
            password: this.password,
            nombre: 'Empresa de Prueba'
          };
          empresas.push(userData);
          localStorage.setItem('empresas', JSON.stringify(empresas));
          loginSuccess = true;
        } else {
          userData = empresas.find(empresa =>
            empresa.emailCorporativo === this.email &&
            empresa.password === this.password
          );
          loginSuccess = !!userData;
        }
      }
      if (loginSuccess) {
        const sessionData = {
          userType: this.currentUserType,
          userData: userData,
          loginTime: new Date().toISOString(),
          remember: this.remember
        };
        if (this.remember) {
          localStorage.setItem('userSession', JSON.stringify(sessionData));
        } else {
          sessionStorage.setItem('userSession', JSON.stringify(sessionData));
        }
        this.showSuccessMessage(`¡Bienvenido! Redirigiendo al panel de ${this.currentUserType}...`);
        setTimeout(() => {
          if (this.currentUserType === 'graduado') {
            this.$router.push('/panel-graduado');
          } else {
            this.$router.push('/panel-empresa');
          }
        }, 1500);
      } else {
        this.showErrorMessage('Credenciales incorrectas. Verifica tu email y contraseña.');
      }
    },
    showErrorMessage(message) {
      this.errorMessage = message;
    },
    showSuccessMessage(message) {
      this.successMessage = message;
    },
    hideMessages() {
      this.errorMessage = '';
      this.successMessage = '';
    },
    forgotPassword() {
      alert('Funcionalidad de recuperación de contraseña aún no implementada.');
    },
    redirectToRegister(type) {
      if (type === 'graduado') {
        this.$router.push('/registro-graduados');
      } else {
        this.$router.push('/registro-empresas');
      }
    }
  },
  mounted() {
    // Verificar si ya hay una sesión activa al cargar la página
    const session = localStorage.getItem('userSession') || sessionStorage.getItem('userSession');
    if (session) {
      const sessionData = JSON.parse(session);
      this.showSuccessMessage(`Ya tienes una sesión activa como ${sessionData.userType}. Redirigiendo...`);
      setTimeout(() => {
        if (sessionData.userType === 'graduado') {
          this.$router.push('/panel-graduado');
        } else {
          this.$router.push('/panel-empresa');
        }
      }, 2000);
    }
  }
}
</script>

<style scoped src="../assets/css/login.css"></style>
