# AlternaJob Backend

## Informations systèmes

- Java 17
- Maven 3.6

## Installation

1. Compiler le projet
```bash
mvn clean install
```

2. Lancer l'application
```bash
mvn spring-boot:run
```

L'application sera accessible sur `http://localhost:8080`

## Configuration H2 (Base de données locale)

Par défaut, l'application utilise une base de données H2 en mode fichier.

### Accès à la console H2
**Attention!** Si la base est utilisée par le back, elle ne sera pas accessible!
- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:file:./data/alternajob`
- Username: `sa`
- Password: (laisser vide)

Les données sont persistées dans le dossier `./data/` à la racine du projet.

## Migration vers PostgreSQL

### 1. Configurer l'application

Modifier le fichier `src/main/resources/application-postgres.properties` avec vos paramètres :

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/alternajob
spring.datasource.username=postgres
spring.datasource.password=votre_mot_de_passe
```

### 2. Lancer l'application avec le profil PostgreSQL

```bash
mvn spring-boot:run -Dspring-boot.run.profiles=postgres
```

Ou définir la variable d'environnement :
```bash
export SPRING_PROFILES_ACTIVE=postgres
mvn spring-boot:run
```

### 3. Vérification

L'application créera automatiquement les tables nécessaires grâce à `spring.jpa.hibernate.ddl-auto=update`.

## Sécurité

### Chiffrement des données personnelles

Les données personnelles (nom, prénom) sont chiffrées en base de données avec Jasypt.

**IMPORTANT**: Changer la clé de chiffrement en production !

Dans `application.properties`, modifier :
```properties
jasypt.encryptor.password=VOTRE_CLE_SECRETE_FORTE
```

### Hachage des mots de passe

Les mots de passe sont hachés avec BCrypt avant stockage en base de données. BCrypt est un algorithme de hachage adaptatif spécialement conçu pour les mots de passe, offrant une protection contre les attaques par force brute grâce à son facteur de coût ajustable.

## API Endpoints

### Utilisateurs

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/users` | Récupérer tous les utilisateurs |
| GET | `/api/users/{id}` | Récupérer un utilisateur par ID |
| POST | `/api/users` | Créer un nouvel utilisateur |
| PATCH | `/api/users/{id}` | Mettre à jour un utilisateur |
| DELETE | `/api/users/{id}` | Supprimer un utilisateur |

## Modèle de données

### Entité User

| Champ | Type | Description |
|-------|------|-------------|
| id | Long | Identifiant unique (auto-généré) |
| username | String | Nom d'utilisateur (unique, 3-50 caractères) |
| password | String | Mot de passe haché (BCrypt) |
| role | Enum | Rôle (ADMIN, ETUDIANT, PROFESSIONNEL) |
| nom | String | Nom de famille (chiffré) |
| prenom | String | Prénom (chiffré) |
| createdAt | LocalDateTime | Date de création |
| updatedAt | LocalDateTime | Date de dernière modification |

## Structure du projet

```
src/
├── main/
│   ├── java/
│   │   └── com/alternajob/backend/
│   │       ├── config/          # Configuration (chiffrement)
│   │       ├── controller/      # Contrôleurs REST
│   │       ├── dto/             # Data Transfer Objects
│   │       ├── model/           # Entités JPA
│   │       ├── repository/      # Repositories JPA
│   │       └── service/         # Logique métier
│   └── resources/
│       ├── application.properties          # Config H2
│       └── application-postgres.properties # Config PostgreSQL
```