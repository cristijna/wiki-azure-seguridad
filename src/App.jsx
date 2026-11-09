import { useState } from 'react';
import './App.css';

function App() {
  // useState guarda qué artículo está seleccionado actualmente. Empieza nulo (vacío).
  const [articuloActivo, setArticuloActivo] = useState(null);

  // Base de datos local de la wiki
  const articulos = [
      {
        id: 1,
        titulo: "1. Control de Acceso Basado en Roles (RBAC)",
        contenido: "El Control de Acceso Basado en Roles (RBAC) de Azure es un sistema de autorización fundamentado en Azure Resource Manager. Proporciona administración de acceso detallado a los recursos de la nube, aplicando el principio de menor privilegio.\n\nCon RBAC, puedes segregar las tareas dentro de un equipo de TI y otorgar a los usuarios únicamente el nivel de acceso que necesitan. Por ejemplo, en lugar de dar permisos de Administrador Global, puedes asignar el rol de 'Lector' a nivel de un Grupo de Recursos específico, asegurando que un error humano no comprometa toda la infraestructura.",
        normativas: ["NIST SP 800-53 (AC-2, AC-3)", "ISO/IEC 27001 (A.9.2.3)", "COBIT 2019 (DSS05.04)"]
      },
      {
        id: 2,
        titulo: "2. Gestión de Grupos con Microsoft Entra ID",
        contenido: "Microsoft Entra ID (anteriormente Azure AD) es el servicio principal de administración de acceso e identidades de Microsoft.\n\nEn un entorno de gobernanza de TI maduro, es una regla fundamental asignar roles RBAC a Grupos de Entra ID en lugar de a usuarios individuales. Esto simplifica drásticamente la gestión y la auditoría: si un empleado cambia de rol o abandona la empresa, simplemente se modifica su pertenencia al grupo. El sistema revoca o actualiza automáticamente sus privilegios, evitando cuentas huérfanas con accesos peligrosos.",
        normativas: ["ISO/IEC 27001 (A.9.1.1)", "NIST SP 800-53 (IA-2)", "Ley 21.459 (Delitos Informáticos)"]
      },
      {
        id: 3,
        titulo: "3. Seguridad en Storage Accounts (TLS 1.2)",
        contenido: "Las Cuentas de Almacenamiento son recursos críticos que requieren configuraciones estrictas para mantener la confidencialidad de los datos.\n\nPara blindar un Storage Account, la primera medida es forzar el uso de TLS 1.2 o superior, rechazando cualquier conexión que intente usar protocolos obsoletos y vulnerables. Además, se debe deshabilitar el acceso público anónimo a nivel de contenedor y priorizar el uso de Identidades Administradas (Managed Identities) para que las aplicaciones accedan a los datos sin necesidad de exponer claves de acceso en el código fuente.",
        normativas: ["NIST SP 800-53 (SC-8)", "ISO/IEC 27001 (A.10.1.1)"]
      },
      {
        id: 4,
        titulo: "4. Gobernanza y Cumplimiento con Azure Policy",
        contenido: "Azure Policy es el motor de gobierno que evalúa los recursos de Azure y los compara con las reglas de negocio y seguridad de la organización. Esencialmente, audita y hace cumplir estándares en tiempo real.\n\nPor ejemplo, puedes crear una política que prohíba la creación de máquinas virtuales que no tengan cifrado de disco habilitado, o impedir que se desplieguen recursos fuera de una región geográfica específica. Es el núcleo para asegurar que la infraestructura cumpla continuamente con normativas y marcos de control corporativo.",
        normativas: ["COBIT 2019 (EDM01, APO01)", "ISO/IEC 27001 (A.18.1.1)"]
      },
      {
        id: 5,
        titulo: "5. Microsoft Defender for Cloud",
        contenido: "Defender for Cloud es una plataforma de protección de aplicaciones nativa de la nube (CNAPP) que fortalece la postura de seguridad de tus recursos.\n\nEsta herramienta evalúa continuamente la infraestructura para entregarte una métrica llamada 'Secure Score' (Puntuación de Seguridad), la cual indica qué tan blindados están tus recursos. Además, proporciona alertas de amenazas avanzadas en tiempo real, detectando intentos de fuerza bruta, malware o configuraciones de red inusuales antes de que se conviertan en incidentes críticos.",
        normativas: ["NIST SP 800-53 (SI-4)", "ISO/IEC 27001 (A.12.6.1)", "Ley 21.719 (Ciberseguridad)"]
      },
      {
        id: 6,
        titulo: "6. Auditoría y Trazabilidad (Azure Monitor)",
        contenido: "La seguridad no está completa sin una estrategia sólida de auditoría. Azure Monitor y Log Analytics permiten recopilar y analizar la telemetría generada por todos los servicios en la nube.\n\nMediante los Activity Logs (Registros de Actividad), puedes rastrear exactamente quién hizo qué y cuándo dentro de la plataforma (por ejemplo, quién borró una base de datos o quién modificó un grupo de seguridad de red). Esta trazabilidad es vital para investigar brechas de seguridad y cumplir con los controles de auditoría exigidos por los marcos de ciberseguridad.",
        normativas: ["NIST SP 800-53 (AU-2, AU-6)", "COBIT 2019 (MEA02)"]
      }
    ];

  return (
    <div className="contenedor">
      <header className="header">
        <h1>Wiki: Seguridad en Microsoft Azure </h1>
      </header>
      
      <div className="wiki-layout">
        {/* Menú lateral */}
        <nav className="sidebar glass-panel">
          <h3>Temas de Estudio</h3>
          <ul>
            {articulos.map((art) => (
              <li key={art.id}>
                <button 
                  className={articuloActivo?.id === art.id ? 'activo' : ''}
                  onClick={() => setArticuloActivo(art)}
                >
                  {art.titulo}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <main className="contenido-principal glass-panel">
          {articuloActivo ? (
            // La propiedad 'key' fuerza a React a recrear el div y reiniciar la animación
            <div className="articulo fade-in" key={articuloActivo.id}>
              <h2>{articuloActivo.titulo}</h2>
              {articuloActivo.contenido.split('\n').map((parrafo, index) => (
                <p key={index}>{parrafo}</p>
              ))}
              
              <div className="gobernanza-container">
                <h4>Marco de Cumplimiento y Gobernanza:</h4>
                <div className="tags">
                  {articuloActivo.normativas.map((norma, index) => (
                    <span key={index} className="tag">{norma}</span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bienvenida azure-resumen fade-in" key="bienvenida">
              <h2>¿Qué es Microsoft Azure? ☁️</h2>
              <p>
                <strong>Microsoft Azure</strong> es la plataforma de computación en la nube de nivel empresarial de Microsoft. Ofrece infraestructura, plataforma y software como servicio (IaaS, PaaS, SaaS) permitiendo a las organizaciones compilar, ejecutar y administrar aplicaciones a escala global.
              </p>
              
              <div className="pilares-azure">
                <div className="pilar glass-panel">
                  <h3>🛡️ Seguridad Zero Trust</h3>
                  <p>Asume la vulnerabilidad por defecto. Utiliza autenticación estricta (Entra ID), cifrado de extremo a extremo y microsegmentación.</p>
                </div>
                <div className="pilar glass-panel">
                  <h3>⚖️ Gobernanza</h3>
                  <p>Líder en cumplimiento normativo global. Facilita la alineación con estándares como ISO 27001, NIST y COBIT (Azure Policy).</p>
                </div>
                <div className="pilar glass-panel">
                  <h3>🚀 Resiliencia</h3>
                  <p>Garantiza la Disponibilidad de los servicios mediante zonas de redundancia globales y acuerdos de nivel de servicio (SLA) del 99.9%.</p>
                </div>
              </div>
              
              <p className="instruccion-final">
                👈 <strong>Selecciona un tema en el menú lateral</strong> para explorar los controles técnicos.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;