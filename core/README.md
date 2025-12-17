# Tiny Sumo Huly Backend Integration

## Overview
This directory contains the Tiny Sumo branded Huly client with SSO authentication and custom tool support.

## Files
- `tiny_sumo_huly_client.py` - Main client library for Huly integration

## Features
- ✅ Tiny Sumo branding and theming
- ✅ Single Sign-On (SSO) authentication
- ✅ Domain restriction (tiny-sumo.com emails only)
- ✅ Custom tools integration
- ✅ Marketing project templates
- ✅ Task automation
- ✅ Progress tracking
- ✅ Dashboard data integration

## Usage

```python
from core.tiny_sumo_huly_client import TinySumoHulyClient, TinySumoConfig

# Configure the client
config = TinySumoConfig(
    api_key="your-huly-api-key",
    oauth_client_id="your-oauth-client-id",
    custom_tools_enabled=True,
    sso_enabled=True
)

# Use the client
async with TinySumoHulyClient(config) as client:
    # Authenticate with SSO
    await client.authenticate_with_sso("employee@tiny-sumo.com")
    
    # Create Tiny Sumo project
    project = await client.create_tiny_sumo_project(
        client_url="https://client-website.com",
        custom_tools=["analytics", "crm"]
    )
```

## Custom Tools
Register your own tools for integration:

```python
client.register_custom_tool("my_tool", MyCustomToolClass)
```

## Authentication
SSO automatically validates domain restrictions and grants appropriate permissions.

## Environment Variables
- `TINY_SUMO_HULY_API_KEY` - Huly API key
- `GOOGLE_OAUTH_CLIENT_ID` - OAuth client ID
- `GOOGLE_OAUTH_CLIENT_SECRET` - OAuth client secret