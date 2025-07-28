<template>
  <header>
    <div class="container">
      <div class="header-content">
        <div class="logo">ULEAM Jobs</div>
        <router-link to="/" class="back-btn">← Volver al inicio</router-link>
      </div>
    </div>
  </header>
  <main>
    <div class="container">
      <div class="selection-container">
        <h1 class="selection-title">¿Cómo deseas registrarte?</h1>
        <p class="selection-subtitle">
          Selecciona el tipo de cuenta que mejor se adapte a tus necesidades
        </p>
        <div class="options-grid">
          <router-link to="/registro-graduados" class="option-card">
            <div class="option-icon">🎓</div>
            <h3 class="option-title">Soy Graduado</h3>
            <p class="option-description">
              Encuentra las mejores oportunidades laborales que se adapten a tu perfil profesional
            </p>
            <ul class="option-features">
              <li>Acceso a ofertas exclusivas</li>
              <li>Perfil profesional completo</li>
              <li>Conexión directa con empresas</li>
              <li>Seguimiento de postulaciones</li>
            </ul>
          </router-link>
          <router-link to="/registro-empresas" class="option-card">
            <div class="option-icon">🏢</div>
            <h3 class="option-title">Soy Empresa</h3>
            <p class="option-description">
              Publica ofertas de empleo y encuentra el talento ULEAM que necesitas
            </p>
            <ul class="option-features">
              <li>Publicación de ofertas laborales</li>
              <li>Acceso a base de graduados</li>
              <li>Gestión de candidatos</li>
              <li>Estadísticas de reclutamiento</li>
            </ul>
          </router-link>
        </div>
        <div class="divider"></div>
        <p class="help-text">
          ¿Ya tienes una cuenta? <router-link to="/login" style="color: #4f46e5; text-decoration: none;">Inicia sesión aquí</router-link>
        </p>
        <div class="contact-info">
          <h4>¿Necesitas ayuda?</h4>
          <p>📧 Correo: bolsaempleo@uleam.edu.ec</p>
          <p>📞 Teléfono: (05) 262-3740 ext. 123</p>
          <p>🕒 Atención: Lunes a Viernes de 8:00 AM a 5:00 PM</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'SeleccionView',
  mounted() {
    // Animación de entrada de las tarjetas
    this.$nextTick(() => {
      const cards = document.querySelectorAll('.option-card');
      cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
          card.style.transition = 'all 0.6s ease-out';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, index * 200);
      });
    });
  },
  methods: {
    showLogin() {
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped src="../../assets/css/seleccion.css"></style>
