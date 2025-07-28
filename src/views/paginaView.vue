<template>
  <header>
    <div class="container">
      <div class="header-content">
        <div class="logo">ULEAM Jobs</div>
        <nav>
          <ul>
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#empleos">Empleos</a></li>
            <li><a href="#empresas">Empresas</a></li>
            <li><a href="#nosotros">Sobre nosotros</a></li>
          </ul>
        </nav>
        <div class="auth-buttons">
          <button href="/login" class="btn btn-secondary" @click="showLogin">Iniciar sesión</button>
          <button class="btn btn-primary" @click="showRegisterOptions">Registrarse</button>
        </div>
      </div> 
    </div>
  </header>

  <section class="hero" id="inicio">
    <div class="container">
      <h1>¡Encuentra tu trabajo ideal!</h1>
      <p>Conectamos graduados ULEAM con las mejores oportunidades laborales</p>
      <a href="#empleos" class="btn btn-primary">Ver empleos disponibles</a>
    </div>
  </section>

  <section class="stats">
    <div class="container">
      <div class="stats-grid">
        <div class="stat-item">
          <h3 id="graduados-count">{{ graduadosCount.toLocaleString() }}</h3>
          <p>Graduados registrados</p>
        </div>
        <div class="stat-item">
          <h3 id="empresas-count">{{ empresasCount.toLocaleString() }}</h3>
          <p>Empresas participantes</p>
        </div>
        <div class="stat-item">
          <h3 id="empleos-count">{{ empleosCount.toLocaleString() }}</h3>
          <p>Empleos disponibles</p>
        </div>
        <div class="stat-item">
          <h3 id="contratados-count">{{ contratadosCount.toLocaleString() }}</h3>
          <p>Graduados contratados</p>
        </div>
      </div>
    </div>
  </section>

  <section class="categories">
    <div class="container">
      <h2 class="section-title">Categorías destacadas</h2>
      <div class="categories-grid">
        <div class="category-card">
          <h3>Informática</h3>
          <p>Desarrollo, programación, sistemas</p>
          <span>23 empleos</span>
        </div>
        <div class="category-card">
          <h3>Administración</h3>
          <p>Gestión, finanzas, recursos humanos</p>
          <span>18 empleos</span>
        </div>
        <div class="category-card">
          <h3>Ingeniería</h3>
          <p>Civil, industrial, mecánica</p>
          <span>15 empleos</span>
        </div>
        <div class="category-card">
          <h3>Educación</h3>
          <p>Docencia, capacitación, investigación</p>
          <span>12 empleos</span>
        </div>
      </div>
    </div>
  </section>

  <section class="recent-jobs" id="empleos">
    <div class="container">
      <h2 class="section-title">Últimas ofertas publicadas</h2>
      <div class="jobs-grid">
        <div class="job-card">
          <div class="job-title">Desarrollador Full Stack</div>
          <div class="job-company">TechCorp Ecuador</div>
          <div class="job-date">Publicado hace 2 días</div>
        </div>
        <div class="job-card">
          <div class="job-title">Analista Financiero</div>
          <div class="job-company">Banco del Pacífico</div>
          <div class="job-date">Publicado hace 3 días</div>
        </div>
        <div class="job-card">
          <div class="job-title">Ingeniero de Proyectos</div>
          <div class="job-company">Constructora Manabí</div>
          <div class="job-date">Publicado hace 1 semana</div>
        </div>
      </div>
    </div>
  </section>

  <footer>
    <div class="container">
      <div class="footer-content">
        <div>
          <h4>Contacto ULEAM</h4>
          <p>Av. Circunvalación - Vía a San Mateo</p>
          <p>Manta - Ecuador</p>
          <p>Teléfono: (05) 262-3740</p>
        </div>
        <div>
          <h4>Síguenos</h4>
          <p>Facebook | Twitter | LinkedIn</p>
        </div>
        <div>
          <h4>Enlaces</h4>
          <p>Política de privacidad</p>
          <p>Términos y condiciones</p>
        </div>
      </div>
      <p>&copy; 2025 Universidad Laica Eloy Alfaro de Manabí</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'PaginaView',
  data() {
    return {
      graduadosCount: 0,
      empresasCount: 0,
      empleosCount: 0,
      contratadosCount: 0,
      statsTargets: {
        graduadosCount: 1247,
        empresasCount: 156,
        empleosCount: 89,
        contratadosCount: 523
      }
    };
  },
  mounted() {
    setTimeout(this.animateCounters, 500);
    // Scroll suave para navegación
    this.$nextTick(() => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
    });
  },
  methods: {
    showLogin() {
      if (this.$router) {
        this.$router.push('/login');
      } else {
        window.location.href = '/login';
      }
    },
    showRegisterOptions() {
      // Redirige usando Vue Router si está disponible, si no, window.location
      if (this.$router) {
        this.$router.push('/seleccion');
      } else {
        window.location.href = 'Seleccion/Seleccion.html';
      }
    },
    animateCounters() {
      const keys = Object.keys(this.statsTargets);
      keys.forEach(key => {
        let current = 0;
        const target = this.statsTargets[key];
        const increment = target / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            this[key] = target;
            clearInterval(timer);
          } else {
            this[key] = Math.floor(current);
          }
        }, 30);
      });
    }
  }
}
</script>

<style scoped src="../assets/css/pagina.css"></style>

