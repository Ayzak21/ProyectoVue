<template>
  <header>
    <div class="container">
      <div class="header-content">
        <div class="logo">ULEAM Jobs</div>
        <router-link to="/" class="back-btn">← Volver al inicio</router-link>
      </div>
    </div>
  </header>
  <div class="container">
    <div class="main-content">
      <h1 class="form-title">Registro de Empresas</h1>
      <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
        <!-- Datos de la Empresa -->
        <div class="form-section">
          <div class="section-title">Datos de la Empresa</div>
          <div class="form-row">
            <div class="form-group">
              <label for="razonSocial">Razón Social <span class="required">*</span></label>
              <input type="text" id="razonSocial" v-model="form.razonSocial" required>
            </div>
            <div class="form-group">
              <label for="ruc">RUC <span class="required">*</span></label>
              <input type="text" id="ruc" v-model="form.ruc" maxlength="13" required @input="onlyNumbers('ruc')">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="nombreComercial">Nombre Comercial <span class="required">*</span></label>
              <input type="text" id="nombreComercial" v-model="form.nombreComercial" required>
            </div>
            <div class="form-group">
              <label for="sector">Sector/Industria <span class="required">*</span></label>
              <select id="sector" v-model="form.sector" required>
                <option value="">Seleccione...</option>
                <option value="tecnologia">Tecnología</option>
                <option value="financiero">Financiero</option>
                <option value="manufactura">Manufactura</option>
                <option value="servicios">Servicios</option>
                <option value="comercio">Comercio</option>
                <option value="construccion">Construcción</option>
                <option value="educacion">Educación</option>
                <option value="salud">Salud</option>
                <option value="turismo">Turismo</option>
                <option value="otro">Otro</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="tamanoEmpresa">Tamaño de Empresa <span class="required">*</span></label>
              <select id="tamanoEmpresa" v-model="form.tamanoEmpresa" required>
                <option value="">Seleccione...</option>
                <option value="pequena">Pequeña (1-10 empleados)</option>
                <option value="mediana">Mediana (11-50 empleados)</option>
                <option value="grande">Grande (51+ empleados)</option>
              </select>
            </div>
            <div class="form-group">
              <label for="anoFundacion">Año de Fundación</label>
              <input type="number" id="anoFundacion" v-model="form.anoFundacion" min="1900" max="2025">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group full-width">
              <label for="sitioWeb">Sitio Web</label>
              <input type="url" id="sitioWeb" v-model="form.sitioWeb" placeholder="https://www.ejemplo.com">
            </div>
          </div>
          <div class="form-group full-width">
            <label for="descripcionEmpresa">Descripción de la Empresa <span class="required">*</span></label>
            <textarea id="descripcionEmpresa" v-model="form.descripcionEmpresa" placeholder="Describa brevemente su empresa, actividades principales, misión, etc." required></textarea>
          </div>
        </div>
        <!-- Datos de Contacto Principal -->
        <div class="form-section">
          <div class="section-title">Datos de Contacto Principal</div>
          <div class="form-row">
            <div class="form-group">
              <label for="nombreResponsable">Nombres del Responsable <span class="required">*</span></label>
              <input type="text" id="nombreResponsable" v-model="form.nombreResponsable" required>
            </div>
            <div class="form-group">
              <label for="apellidoResponsable">Apellidos del Responsable <span class="required">*</span></label>
              <input type="text" id="apellidoResponsable" v-model="form.apellidoResponsable" required>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="cargoResponsable">Cargo <span class="required">*</span></label>
              <input type="text" id="cargoResponsable" v-model="form.cargoResponsable" placeholder="Ej: Gerente de RRHH, Director, etc." required>
            </div>
            <div class="form-group">
              <label for="telefonoContacto">Teléfono de Contacto <span class="required">*</span></label>
              <input type="tel" id="telefonoContacto" v-model="form.telefonoContacto" maxlength="10" required @input="onlyNumbers('telefonoContacto')">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="emailCorporativo">Correo Electrónico Corporativo <span class="required">*</span></label>
              <input type="email" id="emailCorporativo" v-model="form.emailCorporativo" required>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="passwordEmpresa">Contraseña <span class="required">*</span></label>
              <input type="password" id="passwordEmpresa" v-model="form.passwordEmpresa" required>
              <div class="password-requirements">
                Mínimo 8 caracteres, al menos una mayúscula, una minúscula y un número
              </div>
            </div>
            <div class="form-group">
              <label for="confirmPasswordEmpresa">Confirmar Contraseña <span class="required">*</span></label>
              <input type="password" id="confirmPasswordEmpresa" v-model="form.confirmPasswordEmpresa" required @input="validatePasswordMatch">
            </div>
          </div>
        </div>
        <!-- Dirección -->
        <div class="form-section">
          <div class="section-title">Dirección</div>
          <div class="form-row">
            <div class="form-group">
              <label for="provincia">Provincia <span class="required">*</span></label>
              <select id="provincia" v-model="form.provincia" required>
                <option value="">Seleccione...</option>
                <option value="manabi">Manabí</option>
                <option value="guayas">Guayas</option>
                <option value="pichincha">Pichincha</option>
                <option value="azuay">Azuay</option>
                <option value="los_rios">Los Ríos</option>
                <option value="el_oro">El Oro</option>
                <option value="esmeraldas">Esmeraldas</option>
                <option value="santa_elena">Santa Elena</option>
              </select>
            </div>
            <div class="form-group">
              <label for="ciudadEmpresa">Ciudad <span class="required">*</span></label>
              <input type="text" id="ciudadEmpresa" v-model="form.ciudadEmpresa" required>
            </div>
          </div>
          <div class="form-group full-width">
            <label for="direccionDetallada">Dirección Detallada <span class="required">*</span></label>
            <textarea id="direccionDetallada" v-model="form.direccionDetallada" placeholder="Dirección completa con referencias" required></textarea>
          </div>
        </div>
        <!-- Documentos Requeridos -->
        <div class="form-section">
          <div class="section-title">Documentos Requeridos</div>
          <div class="form-row">
            <div class="form-group">
              <label for="archivoRuc">Subir RUC (PDF) <span class="required">*</span></label>
              <div class="file-upload">
                <input type="file" id="archivoRuc" accept=".pdf" required @change="handleFileSelect($event, 'ruc')">
                <label for="archivoRuc" class="file-upload-label">Haga clic para seleccionar archivo PDF</label>
              </div>
              <div class="file-info">Solo archivos PDF, máximo 5MB</div>
              <div v-if="rucFileInfo" class="selected-file">{{ rucFileInfo }}</div>
            </div>
            <div class="form-group">
              <label for="logoEmpresa">Logo de la Empresa <span class="required">*</span></label>
              <div class="file-upload">
                <input type="file" id="logoEmpresa" accept=".jpg,.jpeg,.png" required @change="handleFileSelect($event, 'logo')">
                <label for="logoEmpresa" class="file-upload-label">Haga clic para seleccionar imagen</label>
              </div>
              <div class="file-info">JPG, PNG - máximo 2MB</div>
              <div v-if="logoFileInfo" class="selected-file">{{ logoFileInfo }}</div>
            </div>
          </div>
        </div>
        <!-- Aceptación de Términos -->
        <div class="terms-container">
          <input type="checkbox" id="acceptTermsEmpresa" v-model="form.acceptTermsEmpresa" required>
          <label for="acceptTermsEmpresa">
            Acepto los <a href="#" target="_blank">términos y condiciones</a> y la <a href="#" target="_blank">política de privacidad</a> de ULEAM Jobs para empresas
          </label>
        </div>
        <button type="submit" class="btn btn-primary">Registrar Empresa</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegistroEmpresaView',
  data() {
    return {
      form: {
        razonSocial: '',
        ruc: '',
        nombreComercial: '',
        sector: '',
        tamanoEmpresa: '',
        anoFundacion: '',
        sitioWeb: '',
        descripcionEmpresa: '',
        nombreResponsable: '',
        apellidoResponsable: '',
        cargoResponsable: '',
        telefonoContacto: '',
        emailCorporativo: '',
        passwordEmpresa: '',
        confirmPasswordEmpresa: '',
        provincia: '',
        ciudadEmpresa: '',
        direccionDetallada: '',
        acceptTermsEmpresa: false,
      },
      archivoRuc: null,
      logoEmpresa: null,
      successMessage: '',
      errorMessage: '',
      rucFileInfo: '',
      logoFileInfo: '',
    };
  },
  methods: {
    validateRUC(ruc) {
      if (ruc.length !== 13) return false;
      const province = parseInt(ruc.substring(0, 2));
      if (province < 1 || province > 24) return false;
      const thirdDigit = parseInt(ruc.charAt(2));
      if (![6, 7, 8, 9].includes(thirdDigit)) return false;
      return true;
    },
    validatePassword(password) {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
      return regex.test(password);
    },
    handleFileSelect(e, type) {
      const file = e.target.files[0];
      if (type === 'ruc') {
        this.archivoRuc = file;
        this.rucFileInfo = file ? `Archivo seleccionado: ${file.name} (${(file.size/1024/1024).toFixed(2)} MB)` : '';
      } else {
        this.logoEmpresa = file;
        this.logoFileInfo = file ? `Archivo seleccionado: ${file.name} (${(file.size/1024/1024).toFixed(2)} MB)` : '';
      }
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
      if (!this.validateRUC(this.form.ruc)) {
        this.showMessage('error', 'El RUC ingresado no es válido para una empresa.');
        return;
      }
      if (!this.validatePassword(this.form.passwordEmpresa)) {
        this.showMessage('error', 'La contraseña no cumple con los requisitos de seguridad.');
        return;
      }
      if (this.form.passwordEmpresa !== this.form.confirmPasswordEmpresa) {
        this.showMessage('error', 'Las contraseñas no coinciden.');
        return;
      }
      if (!this.archivoRuc) {
        this.showMessage('error', 'Debe subir el archivo del RUC.');
        return;
      }
      if (!this.logoEmpresa) {
        this.showMessage('error', 'Debe subir el logo de la empresa.');
        return;
      }
      if (this.archivoRuc.size > 5 * 1024 * 1024) {
        this.showMessage('error', 'El archivo del RUC no debe superar los 5MB.');
        return;
      }
      if (this.logoEmpresa.size > 2 * 1024 * 1024) {
        this.showMessage('error', 'El logo no debe superar los 2MB.');
        return;
      }
      if (!this.form.acceptTermsEmpresa) {
        this.showMessage('error', 'Debe aceptar los términos y condiciones.');
        return;
      }
      try {
        const existingEmpresas = JSON.parse(localStorage.getItem('empresas_uleam') || '[]');
        const exists = existingEmpresas.some(emp =>
          emp.ruc === this.form.ruc ||
          emp.emailCorporativo === this.form.emailCorporativo
        );
        if (exists) {
          this.showMessage('error', 'Ya existe una empresa registrada con estos datos.');
          return;
        }
        const data = { ...this.form };
        data.id = Date.now();
        data.fechaRegistro = new Date().toISOString();
        data.estado = 'pendiente_aprobacion';
        delete data.confirmPasswordEmpresa;
        data.archivoRucNombre = this.archivoRuc.name;
        data.logoEmpresaNombre = this.logoEmpresa.name;
        existingEmpresas.push(data);
        localStorage.setItem('empresas_uleam', JSON.stringify(existingEmpresas));
        this.showMessage('success', '¡Registro exitoso! Su empresa ha sido registrada y está pendiente de aprobación.');
        setTimeout(() => {
          this.resetForm();
        }, 3000);
      } catch (error) {
        this.showMessage('error', 'Error al guardar los datos. Intente nuevamente.');
        console.error('Error:', error);
      }
    },
    resetForm() {
      this.form = {
        razonSocial: '',
        ruc: '',
        nombreComercial: '',
        sector: '',
        tamanoEmpresa: '',
        anoFundacion: '',
        sitioWeb: '',
        descripcionEmpresa: '',
        nombreResponsable: '',
        apellidoResponsable: '',
        cargoResponsable: '',
        telefonoContacto: '',
        emailCorporativo: '',
        passwordEmpresa: '',
        confirmPasswordEmpresa: '',
        provincia: '',
        ciudadEmpresa: '',
        direccionDetallada: '',
        acceptTermsEmpresa: false,
      };
      this.archivoRuc = null;
      this.logoEmpresa = null;
      this.rucFileInfo = '';
      this.logoFileInfo = '';
    },
    onlyNumbers(field) {
      this.form[field] = this.form[field].replace(/[^0-9]/g, '');
    },
    validatePasswordMatch() {
      if (this.form.confirmPasswordEmpresa && this.form.passwordEmpresa !== this.form.confirmPasswordEmpresa) {
        this.errorMessage = 'Las contraseñas no coinciden.';
      } else {
        this.errorMessage = '';
      }
    }
  }
};
</script>

<style scoped src="../../../assets/css/empresa.css"></style>
