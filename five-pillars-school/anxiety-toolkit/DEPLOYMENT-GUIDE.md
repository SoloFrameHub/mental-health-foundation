# MODULE 1 DEPLOYMENT GUIDE

## Files Created:
- `lesson-1-1-COMPLETE-INTEGRATED.html` - Full lesson with all integrations
- `assets/Introduction-Welcome-to-Anxiety-Toolkit.html` - Interactive Gamma presentation
- `typebot-flows-config.json` - Typebot flow configurations

## Deployment Steps:

### 1. Upload Files to VPS:
```bash
scp lesson-1-1-COMPLETE-INTEGRATED.html root@46.202.88.248:/var/www/courses/anxiety-toolkit/
scp -r assets root@46.202.88.248:/var/www/courses/anxiety-toolkit/
```

### 2. Configure Typebot Flows:
1. Access Typebot Builder: http://46.202.88.248:3003
2. Create new flows using configurations in `typebot-flows-config.json`
3. Note the flow IDs and update them in the HTML

### 3. Get Chatwoot Website Token:
```bash
ssh root@46.202.88.248
docker exec -it chatwoot_web_1 rails console
website = Website.find_by(domain: 'realpsychiatricservices.com')
puts website.website_token
```
Update the token in the HTML file.

### 4. Configure Nginx:
Add to your nginx config:
```nginx
location /courses/anxiety-toolkit/ {
    root /var/www;
    try_files $uri $uri/ /index.html;
    add_header X-Frame-Options "SAMEORIGIN";
}
```

### 5. Test All Integrations:
- [ ] Body map interactive elements work
- [ ] Gamma presentation loads and navigates
- [ ] TinyMCE notebook saves and downloads
- [ ] Typebot flows load and respond
- [ ] Chatwoot chat widget appears
- [ ] All buttons and navigation work

## API Endpoints to Configure:

### Directus (for notebook saving):
- Endpoint: `http://46.202.88.248:8055/items/notebook_entries`
- Create collection: `notebook_entries`
- Fields: user_id, module, lesson, content, timestamp, shared_with_provider

### Typebot:
- Builder: `http://46.202.88.248:3003`
- API: `http://46.202.88.248:3003/api`
- Viewer: `http://46.202.88.248:3001`

### Chatwoot:
- Dashboard: `http://46.202.88.248:3000`
- Get website token from dashboard
- Configure inbox for course support

## Testing Checklist:
- [ ] Open lesson in Chrome, Firefox, Safari
- [ ] Test on mobile (iOS and Android)
- [ ] Verify all interactive elements
- [ ] Test notebook save/download
- [ ] Verify Typebot flows trigger
- [ ] Check Chatwoot crisis detection
- [ ] Test with screen reader

## Provider Review:
Send to Autumn Persinger for review:
- Link to deployed lesson
- Ask for feedback on:
  - Provider voice accuracy
  - Clinical content
  - User experience
  - Missing elements
