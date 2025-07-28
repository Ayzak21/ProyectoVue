<template>
  <div class="header">
    <h1>Uleam JOBS - Mi Perfil</h1>
    <div class="user-info">
      <span>{{ userName }}</span>
      <button class="logout-btn" @click="logout">Cerrar Sesión</button>
    </div>
  </div>

  <div class="container">
    <div class="success-message" v-if="showSuccessMessage">
      Información guardada correctamente
    </div>

    <div class="profile-header">
      <div class="profile-photo" @click="triggerPhotoInput">
        <span v-if="!profilePhoto" id="photoPlaceholder">👤</span>
        <img v-if="profilePhoto" :src="profilePhoto" alt="Foto de perfil" />
        <div class="photo-upload">📷</div>
        <input type="file" id="photoInput" accept="image/*" ref="photoInput" style="display: none;" @change="onPhotoChange">
      </div>
      <div class="profile-info">
        <h2>{{ profileData.personal.nombres }} {{ profileData.personal.apellidos }}</h2>
        <p><strong>Carrera:</strong> {{ profileData.personal.carrera }}</p>
        <p><strong>Año de Graduación:</strong> {{ profileData.personal.anoGraduacion }}</p>
        <p><strong>Email:</strong> {{ profileData.personal.emailInstitucional }}</p>
      </div>
    </div>

    <div class="profile-tabs">
      <button v-for="tab in tabs" :key="tab.id" class="tab-btn" :class="{ active: activeTab === tab.id }" @click="activeTab = tab.id">{{ tab.label }}</button>
    </div>

    <div class="tab-content">
      <!-- Información Personal -->
      <div v-if="activeTab === 'personal'" class="tab-panel active" id="personal">
        <form @submit.prevent="savePersonalData">
          <div class="form-section">
            <h3>Datos Personales</h3>
            <div class="form-row">
              <div class="form-group">
                <label for="nombres">Nombres</label>
                <input type="text" id="nombres" v-model="profileData.personal.nombres">
              </div>
              <div class="form-group">
                <label for="apellidos">Apellidos</label>
                <input type="text" id="apellidos" v-model="profileData.personal.apellidos">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="fechaNacimiento">Fecha de Nacimiento</label>
                <input type="date" id="fechaNacimiento" v-model="profileData.personal.fechaNacimiento">
              </div>
              <div class="form-group">
                <label for="genero">Género</label>
                <select id="genero" v-model="profileData.personal.genero">
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="estadoCivil">Estado Civil</label>
                <select id="estadoCivil" v-model="profileData.personal.estadoCivil">
                  <option value="soltero">Soltero/a</option>
                  <option value="casado">Casado/a</option>
                  <option value="divorciado">Divorciado/a</option>
                  <option value="viudo">Viudo/a</option>
                </select>
              </div>
              <div class="form-group">
                <label for="nacionalidad">Nacionalidad</label>
                <input type="text" id="nacionalidad" v-model="profileData.personal.nacionalidad">
              </div>
            </div>
            <div class="form-group">
              <label for="direccion">Dirección</label>
              <input type="text" id="direccion" v-model="profileData.personal.direccion">
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="telefono">Teléfono</label>
                <input type="tel" id="telefono" v-model="profileData.personal.telefono">
              </div>
              <div class="form-group">
                <label for="emailPersonal">Email Personal</label>
                <input type="email" id="emailPersonal" v-model="profileData.personal.emailPersonal">
              </div>
            </div>
          </div>
          <button type="submit" class="btn-primary">Guardar Cambios</button>
        </form>
      </div>

      <!-- Formación Académica -->
      <div v-if="activeTab === 'academic'" class="tab-panel" id="academic">
        <div class="form-section">
          <h3>Título ULEAM</h3>
          <div class="form-row">
            <div class="form-group">
              <label for="titulo">Título Obtenido</label>
              <input type="text" id="titulo" v-model="profileData.academic.titulo" readonly>
            </div>
            <div class="form-group">
              <label for="facultad">Facultad</label>
              <input type="text" id="facultad" v-model="profileData.academic.facultad" readonly>
            </div>
          </div>
        </div>
        <div class="form-section">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h3>Otros Estudios/Certificaciones</h3>
            <button type="button" class="btn-primary" @click="showEducationForm = true">+ Agregar Estudio</button>
          </div>
          <div v-if="showEducationForm" class="modal-form">
            <form @submit.prevent="submitEducation">
              <input type="text" v-model="educationForm.titulo" placeholder="Título o curso" required>
              <input type="text" v-model="educationForm.institucion" placeholder="Institución" required>
              <input type="text" v-model="educationForm.ano" placeholder="Año" required>
              <button type="submit" class="btn-primary">Guardar</button>
              <button type="button" class="btn-secondary" @click="cancelEducation">Cancelar</button>
            </form>
          </div>
          <div id="educationList">
            <div v-for="(edu, idx) in profileData.academic.education" :key="idx" class="education-item">
              <div class="item-header">
                <strong>{{ edu.titulo }}</strong>
                <div class="item-actions">
                  <button class="btn-secondary" @click="editEducation(idx)">Editar</button>
                  <button class="btn-danger" @click="removeEducation(idx)">Eliminar</button>
                </div>
              </div>
              <p><strong>Institución:</strong> {{ edu.institucion }}</p>
              <p><strong>Año:</strong> {{ edu.ano }}</p>
              <div v-if="editEducationIdx === idx" class="modal-form">
                <form @submit.prevent="updateEducation(idx)">
                  <input type="text" v-model="educationForm.titulo" required>
                  <input type="text" v-model="educationForm.institucion" required>
                  <input type="text" v-model="educationForm.ano" required>
                  <button type="submit" class="btn-primary">Actualizar</button>
                  <button type="button" class="btn-secondary" @click="cancelEducation">Cancelar</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Experiencia Laboral -->
      <div v-if="activeTab === 'experience'" class="tab-panel" id="experience">
        <div class="form-section">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h3>Experiencia Laboral</h3>
            <button type="button" class="btn-primary" @click="addExperience">+ Agregar Experiencia</button>
          </div>
          <div id="experienceList">
            <div v-for="(exp, idx) in profileData.experience" :key="idx" class="experience-item">
              <div class="item-header">
                <strong>{{ exp.cargo }}</strong>
                <div class="item-actions">
                  <button class="btn-secondary" @click="editExperience(idx)">Editar</button>
                  <button class="btn-danger" @click="removeExperience(idx)">Eliminar</button>
                </div>
              </div>
              <p><strong>Empresa:</strong> {{ exp.empresa }}</p>
              <p><strong>Periodo:</strong> {{ exp.periodo }}</p>
              <p><strong>Funciones:</strong> {{ exp.funciones }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Habilidades -->
      <div v-if="activeTab === 'skills'" class="tab-panel" id="skills">
        <div class="form-section">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h3>Habilidades Técnicas</h3>
            <button type="button" class="btn-primary" @click="addSkill('technical')">+ Agregar Habilidad</button>
          </div>
          <div id="technicalSkills">
            <div v-for="(skill, idx) in profileData.skills.technical" :key="'tech-' + idx" class="skill-item">
              <div class="item-header">
                <strong>{{ skill.nombre }} - {{ skill.nivel }}</strong>
                <div class="item-actions">
                  <button class="btn-danger" @click="removeSkill('technical', idx)">Eliminar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="form-section">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h3>Habilidades Blandas</h3>
            <button type="button" class="btn-primary" @click="addSkill('soft')">+ Agregar Habilidad</button>
          </div>
          <div id="softSkills">
            <div v-for="(skill, idx) in profileData.skills.soft" :key="'soft-' + idx" class="skill-item">
              <div class="item-header">
                <strong>{{ skill.nombre }}</strong>
                <div class="item-actions">
                  <button class="btn-danger" @click="removeSkill('soft', idx)">Eliminar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="form-section">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h3>Idiomas</h3>
            <button type="button" class="btn-primary" @click="addLanguage">+ Agregar Idioma</button>
          </div>
          <div id="languagesList">
            <div v-for="(lang, idx) in profileData.languages" :key="'lang-' + idx" class="skill-item">
              <div class="item-header">
                <strong>{{ lang.idioma }} - {{ lang.nivel }}</strong>
                <div class="item-actions">
                  <button class="btn-danger" @click="removeLanguage(idx)">Eliminar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Preferencias -->
      <div v-if="activeTab === 'preferences'" class="tab-panel" id="preferences">
        <form @submit.prevent="savePreferences">
          <div class="form-section">
            <h3>Preferencias Laborales</h3>
            <div class="form-row">
              <div class="form-group">
                <label for="sectorInteres">Sector de Interés</label>
                <select id="sectorInteres" v-model="profileData.preferences.sectorInteres">
                  <option value="tecnologia">Tecnología</option>
                  <option value="administracion">Administración</option>
                  <option value="ingenieria">Ingeniería</option>
                  <option value="salud">Salud</option>
                </select>
              </div>
              <div class="form-group">
                <label for="tipoContrato">Tipo de Contrato Deseado</label>
                <select id="tipoContrato" v-model="profileData.preferences.tipoContrato">
                  <option value="completo">Tiempo Completo</option>
                  <option value="medio">Medio Tiempo</option>
                  <option value="freelance">Freelance</option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="salarioMin">Salario Mínimo Esperado</label>
                <input type="number" id="salarioMin" v-model="profileData.preferences.salarioMin">
              </div>
              <div class="form-group">
                <label for="salarioMax">Salario Máximo Esperado</label>
                <input type="number" id="salarioMax" v-model="profileData.preferences.salarioMax">
              </div>
            </div>
            <div class="form-group">
              <label>
                <input type="checkbox" id="disponibleViaje" v-model="profileData.preferences.disponibleViaje">
                Disponible para viajar
              </label>
            </div>
            <div class="form-group">
              <label>
                <input type="checkbox" id="disponibleRelocalizacion" v-model="profileData.preferences.disponibleRelocalizacion">
                Disponible para relocalización
              </label>
            </div>
          </div>
          <div class="form-section">
            <h3>Curriculum Vitae</h3>
            <div class="file-upload-area">
              <input type="file" id="cvUpload" accept=".pdf" ref="cvUpload" style="display: none;" @change="onCVChange">
              <p>Subir CV en formato PDF</p>
              <button type="button" class="btn-primary" @click="triggerCVInput">Seleccionar Archivo</button>
              <button type="button" class="btn-secondary">Generar CV desde Perfil</button>
            </div>
          </div>
          <button type="submit" class="btn-primary">Guardar Preferencias</button>
        </form>
      </div>
    </div>
  </div>
  <button class="preview-btn" @click="previewProfile">👁️ Vista Previa</button>
</template>

<script>
export default {
  name: 'PerfilUsuarioView',
  data() {
    return {
      userName: 'Dustin Rugel',
      profilePhoto: '',
      showSuccessMessage: false,
      activeTab: 'personal',
      tabs: [
        { id: 'personal', label: 'Información Personal' },
        { id: 'academic', label: 'Formación Académica' },
        { id: 'experience', label: 'Experiencia Laboral' },
        { id: 'skills', label: 'Habilidades' },
        { id: 'preferences', label: 'Preferencias' }
      ],
      profileData: {
        personal: {
          nombres: 'Juan Pérez',
          apellidos: 'Rodríguez García',
          fechaNacimiento: '1998-05-15',
          genero: 'masculino',
          estadoCivil: 'soltero',
          nacionalidad: 'Ecuatoriana',
          direccion: 'Av. Circunvalación, Manta',
          telefono: '0987654321',
          emailPersonal: 'juan.perez@gmail.com',
          carrera: 'Ingeniería en Sistemas',
          anoGraduacion: '2024',
          emailInstitucional: 'e1805389226@live.uleam.edu.ec'
        },
        academic: {
          titulo: 'Ingeniero en Sistemas Computacionales',
          facultad: 'Facultad de Ciencias Informáticas',
          education: [
            { titulo: 'Curso de JavaScript Avanzado', institucion: 'Platzi', ano: '2023' }
          ]
        },
        experience: [
          {
            empresa: 'TechSolutions Manta',
            cargo: 'Desarrollador Web Junior',
            periodo: 'Enero 2024 - Presente',
            funciones: 'Desarrollo de aplicaciones web con React y Node.js'
          }
        ],
        skills: {
          technical: [
            { nombre: 'JavaScript', nivel: 'Avanzado' },
            { nombre: 'React', nivel: 'Intermedio' }
          ],
          soft: [
            { nombre: 'Trabajo en Equipo' }
          ]
        },
        languages: [
          { idioma: 'Inglés', nivel: 'Intermedio' }
        ],
        preferences: {
          sectorInteres: 'tecnologia',
          tipoContrato: 'completo',
          salarioMin: 600,
          salarioMax: 1200,
          disponibleViaje: false,
          disponibleRelocalizacion: false
        }
      }
    }
  },
  methods: {
    triggerPhotoInput() {
      this.$refs.photoInput.click();
    },
    onPhotoChange(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          this.profilePhoto = ev.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    savePersonalData() {
      sessionStorage.setItem('profileData', JSON.stringify(this.profileData));
      this.showSuccess();
    },
    savePreferences() {
      sessionStorage.setItem('profileData', JSON.stringify(this.profileData));
      this.showSuccess();
    },
    addExperience() {
      const empresa = prompt('Nombre de la empresa:');
      const cargo = prompt('Cargo:');
      const periodo = prompt('Periodo (ej: Enero 2023 - Diciembre 2023):');
      const funciones = prompt('Descripción de funciones:');
      if (empresa && cargo && periodo) {
        this.profileData.experience.push({ empresa, cargo, periodo, funciones });
      }
    },
    removeExperience(idx) {
      this.profileData.experience.splice(idx, 1);
    },
    editExperience(idx) {
      alert('Funcionalidad de edición en desarrollo');
    },
    showEducationForm: false,
    editEducationIdx: null,
    educationForm: { titulo: '', institucion: '', ano: '' },
    addEducation() {
      this.showEducationForm = true;
      this.editEducationIdx = null;
      this.educationForm = { titulo: '', institucion: '', ano: '' };
    },
    submitEducation() {
      this.profileData.academic.education.push({ ...this.educationForm });
      this.showEducationForm = false;
      this.educationForm = { titulo: '', institucion: '', ano: '' };
    },
    removeEducation(idx) {
      this.profileData.academic.education.splice(idx, 1);
      if (this.editEducationIdx === idx) {
        this.editEducationIdx = null;
        this.educationForm = { titulo: '', institucion: '', ano: '' };
      }
    },
    editEducation(idx) {
      this.editEducationIdx = idx;
      this.educationForm = { ...this.profileData.academic.education[idx] };
    },
    updateEducation(idx) {
      this.$set(this.profileData.academic.education, idx, { ...this.educationForm });
      this.editEducationIdx = null;
      this.educationForm = { titulo: '', institucion: '', ano: '' };
    },
    cancelEducation() {
      this.showEducationForm = false;
      this.editEducationIdx = null;
      this.educationForm = { titulo: '', institucion: '', ano: '' };
    },
    addSkill(type) {
      const nombre = prompt('Nombre de la habilidad:');
      const nivel = prompt('Nivel (básico, intermedio, avanzado):');
      if (nombre) {
        if (type === 'technical') {
          this.profileData.skills.technical.push({ nombre, nivel });
        } else {
          this.profileData.skills.soft.push({ nombre });
        }
      }
    },
    removeSkill(type, idx) {
      this.profileData.skills[type].splice(idx, 1);
    },
    addLanguage() {
      const idioma = prompt('Idioma:');
      const nivel = prompt('Nivel (básico, intermedio, avanzado):');
      if (idioma) {
        this.profileData.languages.push({ idioma, nivel });
      }
    },
    removeLanguage(idx) {
      this.profileData.languages.splice(idx, 1);
    },
    showSuccess() {
      this.showSuccessMessage = true;
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 3000);
    },
    previewProfile() {
      alert('Vista previa del perfil - Funcionalidad en desarrollo');
    },
    triggerCVInput() {
      this.$refs.cvUpload.click();
    },
    onCVChange(e) {
      // Puedes manejar el archivo PDF aquí
      alert('Archivo CV seleccionado: ' + e.target.files[0].name);
    },
    logout() {
      sessionStorage.clear();
      localStorage.removeItem('userSession');
      this.$router.push('/login');
    }
  },
  mounted() {
    // Cargar datos guardados si existen
    const saved = sessionStorage.getItem('profileData');
    if (saved) {
      this.profileData = JSON.parse(saved);
    }
  }
}
</script>

<style scoped src="../assets/css/perfil.css"></style>
