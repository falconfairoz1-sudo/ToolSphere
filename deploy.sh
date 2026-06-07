#!/bin/bash

# ToolDataBase Deployment Script
set -e

echo "🚀 Starting ToolDataBase deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
DOMAIN=${1:-"your-domain.com"}
ENV=${2:-"production"}

echo -e "${YELLOW}Domain: $DOMAIN${NC}"
echo -e "${YELLOW}Environment: $ENV${NC}"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
fi

# Create SSL directory if it doesn't exist
mkdir -p ssl

# Update domain in nginx config
sed -i "s/your-domain.com/$DOMAIN/g" nginx.conf

# Update domain in docker-compose
sed -i "s/your-domain.com/$DOMAIN/g" docker-compose.yml

# Update environment file
if [ "$ENV" = "production" ]; then
    sed -i "s/your-domain.com/$DOMAIN/g" client/.env.production
fi

echo -e "${YELLOW}Building and starting containers...${NC}"

# Build and start containers
docker-compose down --remove-orphans
docker-compose build --no-cache
docker-compose up -d

echo -e "${GREEN}✅ Deployment completed!${NC}"
echo -e "${GREEN}Your application should be available at: https://$DOMAIN${NC}"

# Show container status
echo -e "\n${YELLOW}Container Status:${NC}"
docker-compose ps

# Show logs
echo -e "\n${YELLOW}Recent logs:${NC}"
docker-compose logs --tail=20

echo -e "\n${YELLOW}Useful commands:${NC}"
echo "View logs: docker-compose logs -f"
echo "Restart: docker-compose restart"
echo "Stop: docker-compose down"
echo "Update: git pull && ./deploy.sh $DOMAIN $ENV"

# SSL Certificate reminder
echo -e "\n${YELLOW}⚠️  SSL Certificate Setup:${NC}"
echo "1. Obtain SSL certificates for $DOMAIN"
echo "2. Place cert.pem and key.pem in the ./ssl/ directory"
echo "3. Restart nginx: docker-compose restart nginx"
echo ""
echo "For Let's Encrypt certificates:"
echo "certbot certonly --standalone -d $DOMAIN -d www.$DOMAIN"
echo "cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem ./ssl/cert.pem"
echo "cp /etc/letsencrypt/live/$DOMAIN/privkey.pem ./ssl/key.pem"