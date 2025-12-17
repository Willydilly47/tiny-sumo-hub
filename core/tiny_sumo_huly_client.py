"""
Tiny Sumo Huly API Client
Comprehensive integration with Huly's project management system
Branded for Tiny Sumo Marketing Agency with SSO and custom tools support
"""

import asyncio
import aiohttp
import json
from typing import Dict, List, Optional, Any, Union
from datetime import datetime
import logging
import os
from dataclasses import dataclass
from enum import Enum


class TaskType(Enum):
    """Task types for Tiny Sumo marketing projects"""

    SEO_AUDIT = "seo_audit"
    SOCIAL_AUDIT = "social_audit"
    TECHNICAL_AUDIT = "technical_audit"
    CONTENT_ANALYSIS = "content_analysis"
    STRATEGY_REPORT = "strategy_report"
    CAMPAIGN_MANAGEMENT = "campaign_management"
    CLIENT_RELATIONSHIP = "client_relationship"
    ANALYTICS_REPORT = "analytics_report"
    CONTENT_CREATION = "content_creation"


@dataclass
class TinySumoConfig:
    """Configuration for Tiny Sumo Huly integration"""

    api_key: str = None
    base_url: str = "https://api.huly.app"
    oauth_client_id: str = None
    oauth_client_secret: str = None
    tiny_sumo_domain: str = "tiny-sumo.com"
    admin_email: str = "aaron47willis@gmail.com"
    custom_tools_enabled: bool = True
    sso_enabled: bool = True


class TinySumoHulyClient:
    """
    Tiny Sumo branded Huly client with SSO and custom tools support
    """

    def __init__(self, config: TinySumoConfig = None):
        self.config = config or TinySumoConfig()
        self.api_key = self.config.api_key or self._get_api_key()
        self.base_url = self.config.base_url.rstrip("/")
        self.session = None
        self.logger = logging.getLogger(__name__)
        self.custom_tools = {}
        self._authenticated_user = None

    def _get_api_key(self) -> str:
        """Get API key from environment or config"""
        return os.getenv("TINY_SUMO_HULY_API_KEY", "your-tiny-sumo-huly-api-key-here")

    def _get_oauth_credentials(self) -> tuple:
        """Get OAuth credentials"""
        return (
            self.config.oauth_client_id or os.getenv("GOOGLE_OAUTH_CLIENT_ID"),
            self.config.oauth_client_secret or os.getenv("GOOGLE_OAUTH_CLIENT_SECRET"),
        )

    async def __aenter__(self):
        """Async context manager entry"""
        self.session = aiohttp.ClientSession(
            headers={
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json",
                "X-Tiny-Sumo-Brand": "tiny-sumo-marketing",
                "X-Client-Version": "1.0.0",
            }
        )
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        """Async context manager exit"""
        if self.session:
            await self.session.close()

    async def _make_request(
        self, method: str, endpoint: str, **kwargs
    ) -> Dict[str, Any]:
        """Make HTTP request to Huly API with Tiny Sumo branding"""
        url = f"{self.base_url}{endpoint}"

        # Add Tiny Sumo specific headers
        headers = kwargs.get("headers", {})
        headers.update(
            {
                "X-Tiny-Sumo-Client": "tiny-sumo-marketing",
                "X-Request-Source": "tiny-sumo-huly-integration",
            }
        )
        kwargs["headers"] = headers

        try:
            async with self.session.request(method, url, **kwargs) as response:
                response.raise_for_status()
                result = await response.json()

                # Log successful requests for monitoring
                self.logger.info(f"Tiny Sumo Huly API: {method} {endpoint} - Success")
                return result

        except aiohttp.ClientError as e:
            self.logger.error(f"Tiny Sumo Huly API request failed: {e}")
            raise

    # SSO AUTHENTICATION

    async def authenticate_with_sso(self, email: str) -> Dict[str, Any]:
        """Authenticate user with SSO and domain validation"""
        domain = email.split("@")[1] if "@" in email else ""

        # Validate domain restriction
        if domain != self.config.tiny_sumo_domain and email != self.config.admin_email:
            raise PermissionError(
                f"Access restricted to {self.config.tiny_sumo_domain} employees only"
            )

        # Create SSO authentication request
        auth_data = {
            "email": email,
            "domain": domain,
            "client_type": "tiny_sumo_marketing",
            "sso_provider": "google",
            "timestamp": datetime.now().isoformat(),
        }

        result = await self._make_request("POST", "/auth/sso", json=auth_data)
        self._authenticated_user = result.get("user")
        return result

    async def validate_session(self) -> Dict[str, Any]:
        """Validate current session"""
        if not self._authenticated_user:
            raise PermissionError("No active session. Please authenticate first.")

        return await self._make_request("GET", "/auth/validate")

    # CUSTOM TOOLS MANAGEMENT

    def register_custom_tool(self, tool_name: str, tool_class: Any) -> None:
        """Register a custom tool for integration"""
        self.custom_tools[tool_name] = tool_class
        self.logger.info(f"Registered custom tool: {tool_name}")

    async def get_custom_tool_data(
        self, tool_name: str, project_id: str
    ) -> Dict[str, Any]:
        """Get data from a custom tool for a project"""
        if tool_name not in self.custom_tools:
            raise ValueError(f"Custom tool '{tool_name}' not registered")

        tool_class = self.custom_tools[tool_name]
        if hasattr(tool_class, "get_project_data"):
            return await tool_class.get_project_data(project_id)
        else:
            return {
                "error": f"Tool {tool_name} does not support project data retrieval"
            }

    async def integrate_custom_tool_results(
        self, tool_name: str, task_id: str, data: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Integrate custom tool results into a task"""
        tool_data = {
            "custom_tool": tool_name,
            "tool_data": data,
            "integrated_at": datetime.now().isoformat(),
            "client": "tiny_sumo_marketing",
        }

        return await self._make_request(
            "POST", f"/tasks/{task_id}/custom-integration", json=tool_data
        )

    # PROJECT MANAGEMENT

    async def create_project(self, project_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new project with Tiny Sumo branding"""
        # Add Tiny Sumo specific fields
        branded_data = {
            **project_data,
            "client": "tiny_sumo_marketing",
            "brand_colors": {
                "primary": "#8b0000",
                "secondary": "#2d1b1b",
                "accent": "#a52a2a",
            },
            "custom_fields": {
                **project_data.get("custom_fields", {}),
                "brand": "tiny_sumo",
                "created_by": "tiny_sumo_huly_client",
                "api_version": "1.0",
            },
        }

        return await self._make_request("POST", "/projects", json=branded_data)

    async def get_project(self, project_id: str) -> Dict[str, Any]:
        """Get project details with Tiny Sumo context"""
        return await self._make_request("GET", f"/projects/{project_id}")

    async def update_project(
        self, project_id: str, updates: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Update project with Tiny Sumo branding"""
        updates["updated_by"] = "tiny_sumo_huly_client"
        updates["update_timestamp"] = datetime.now().isoformat()
        return await self._make_request(
            "PATCH", f"/projects/{project_id}", json=updates
        )

    async def delete_project(self, project_id: str) -> Dict[str, Any]:
        """Delete a project with confirmation"""
        return await self._make_request("DELETE", f"/projects/{project_id}")

    # TASK MANAGEMENT

    async def create_task(self, task_data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new task with Tiny Sumo metadata"""
        branded_task = {
            **task_data,
            "created_by": "tiny_sumo_huly_client",
            "brand": "tiny_sumo",
            "timestamp": datetime.now().isoformat(),
        }

        return await self._make_request("POST", "/tasks", json=branded_task)

    async def bulk_create_tasks(
        self, project_id: str, tasks: List[Dict[str, Any]]
    ) -> List[Dict[str, Any]]:
        """Create multiple tasks with Tiny Sumo branding"""
        results = []
        for task in tasks:
            task["project_id"] = project_id
            task["created_by"] = "tiny_sumo_huly_client"
            result = await self.create_task(task)
            results.append(result)
        return results

    async def get_project_tasks(self, project_id: str) -> List[Dict[str, Any]]:
        """Get all tasks for a project"""
        return await self._make_request("GET", f"/projects/{project_id}/tasks")

    async def get_tasks_by_type(
        self, project_id: str, task_type: Union[str, TaskType]
    ) -> List[Dict[str, Any]]:
        """Get tasks filtered by type"""
        if isinstance(task_type, TaskType):
            task_type = task_type.value

        all_tasks = await self.get_project_tasks(project_id)
        return [
            task
            for task in all_tasks
            if task.get("custom_fields", {}).get("task_type") == task_type
        ]

    async def update_task(
        self, task_id: str, updates: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Update task with Tiny Sumo tracking"""
        updates["updated_by"] = "tiny_sumo_huly_client"
        updates["update_timestamp"] = datetime.now().isoformat()
        return await self._make_request("PATCH", f"/tasks/{task_id}", json=updates)

    async def complete_task(self, task_id: str) -> Dict[str, Any]:
        """Mark task as completed with Tiny Sumo tracking"""
        return await self.update_task(
            task_id,
            {
                "status": "completed",
                "completed_at": datetime.now().isoformat(),
                "completed_by": "tiny_sumo_huly_client",
            },
        )

    # TINY SUMO SPECIFIC METHODS

    async def create_tiny_sumo_project(
        self,
        client_url: str,
        project_type: str = "marketing_audit",
        custom_tools: List[str] = None,
    ) -> Dict[str, Any]:
        """Create a Tiny Sumo branded marketing project"""
        project_data = {
            "name": f"Tiny Sumo Marketing - {client_url}",
            "description": f"Comprehensive marketing project for {client_url} - Powered by Tiny Sumo",
            "project_type": project_type,
            "client_url": client_url,
            "custom_fields": {
                "client_url": client_url,
                "project_type": project_type,
                "created_date": datetime.now().isoformat(),
                "status": "active",
                "brand": "tiny_sumo",
                "custom_tools_enabled": custom_tools or [],
                "marketing_agency": "tiny_sumo_marketing",
            },
            "template_id": "tiny_sumo_marketing_template",
            "brand_colors": {
                "primary": "#8b0000",
                "secondary": "#2d1b1b",
                "accent": "#a52a2a",
            },
        }

        project = await self.create_project(project_data)

        # Generate standard Tiny Sumo tasks
        await self.generate_tiny_sumo_tasks(project["id"], client_url, custom_tools)

        return project

    async def generate_tiny_sumo_tasks(
        self, project_id: str, client_url: str, custom_tools: List[str] = None
    ) -> List[Dict[str, Any]]:
        """Generate Tiny Sumo branded marketing tasks"""
        tasks = [
            {
                "title": "SEO Analysis & Competitor Research",
                "description": f"Comprehensive SEO analysis for {client_url}",
                "assignee": "seo_specialist",
                "priority": "high",
                "estimated_hours": 4,
                "custom_fields": {
                    "task_type": TaskType.SEO_AUDIT.value,
                    "automation_level": "high",
                    "data_sources": ["google_search_console", "semrush", "ahrefs"],
                    "client_url": client_url,
                    "tiny_sumo_specialty": True,
                },
            },
            {
                "title": "Social Media Performance Analysis",
                "description": f"Social media audit and strategy for {client_url}",
                "assignee": "social_specialist",
                "priority": "high",
                "estimated_hours": 3,
                "custom_fields": {
                    "task_type": TaskType.SOCIAL_AUDIT.value,
                    "automation_level": "medium",
                    "data_sources": ["meta_business", "twitter_api", "linkedin_api"],
                    "client_url": client_url,
                    "tiny_sumo_specialty": True,
                },
            },
            {
                "title": "Technical Website Audit",
                "description": f"Technical performance analysis for {client_url}",
                "assignee": "technical_specialist",
                "priority": "medium",
                "estimated_hours": 3,
                "custom_fields": {
                    "task_type": TaskType.TECHNICAL_AUDIT.value,
                    "automation_level": "medium",
                    "data_sources": ["google_page_speed", "gtmetrix", "lighthouse"],
                    "client_url": client_url,
                    "tiny_sumo_specialty": True,
                },
            },
            {
                "title": "Content Strategy Development",
                "description": f"Content marketing strategy for {client_url}",
                "assignee": "content_strategist",
                "priority": "medium",
                "estimated_hours": 2,
                "custom_fields": {
                    "task_type": TaskType.CONTENT_ANALYSIS.value,
                    "automation_level": "low",
                    "data_sources": ["google_trends", "buzzsumo", "semrush"],
                    "client_url": client_url,
                    "tiny_sumo_specialty": True,
                },
            },
            {
                "title": "Strategic Marketing Recommendations",
                "description": f"Comprehensive marketing strategy for {client_url}",
                "assignee": "senior_strategist",
                "priority": "high",
                "estimated_hours": 2,
                "custom_fields": {
                    "task_type": TaskType.STRATEGY_REPORT.value,
                    "automation_level": "high",
                    "depends_on": [
                        TaskType.SEO_AUDIT.value,
                        TaskType.SOCIAL_AUDIT.value,
                        TaskType.TECHNICAL_AUDIT.value,
                        TaskType.CONTENT_ANALYSIS.value,
                    ],
                    "client_url": client_url,
                    "tiny_sumo_specialty": True,
                },
            },
        ]

        # Add custom tool tasks if specified
        if custom_tools:
            for tool in custom_tools:
                tasks.append(
                    {
                        "title": f"{tool.replace('_', ' ').title()} Analysis",
                        "description": f"Custom {tool} analysis for {client_url}",
                        "assignee": "specialist",
                        "priority": "medium",
                        "estimated_hours": 2,
                        "custom_fields": {
                            "task_type": f"custom_{tool}",
                            "custom_tool": tool,
                            "client_url": client_url,
                            "tiny_sumo_specialty": True,
                        },
                    }
                )

        return await self.bulk_create_tasks(project_id, tasks)

    # CUSTOM INTEGRATION METHODS

    async def update_task_with_custom_data(
        self, task_id: str, tool_name: str, data: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Update task with custom tool data"""
        if tool_name not in self.custom_tools:
            raise ValueError(f"Custom tool '{tool_name}' not registered")

        updates = {
            "description": f"{tool_name.replace('_', ' ').title()} Results:\n\n"
            f"{self._format_custom_data(data)}",
            "custom_fields": {
                "custom_tool_data": data,
                "custom_tool_name": tool_name,
                "last_updated": datetime.now().isoformat(),
                "integration_client": "tiny_sumo_marketing",
            },
        }

        return await self.update_task(task_id, updates)

    def _format_custom_data(self, data: Dict[str, Any]) -> str:
        """Format custom tool data for task description"""
        formatted_lines = []
        for key, value in data.items():
            if isinstance(value, (int, float)):
                formatted_lines.append(f"{key.replace('_', ' ').title()}: {value:,}")
            else:
                formatted_lines.append(f"{key.replace('_', ' ').title()}: {value}")
        return "\n".join(formatted_lines)

    async def get_project_progress_summary(self, project_id: str) -> Dict[str, Any]:
        """Get comprehensive project progress summary with Tiny Sumo branding"""
        project = await self.get_project(project_id)
        tasks = await self.get_project_tasks(project_id)

        completed_tasks = [t for t in tasks if t.get("status") == "completed"]
        in_progress_tasks = [t for t in tasks if t.get("status") == "in_progress"]
        pending_tasks = [t for t in tasks if t.get("status") == "pending"]

        progress_percentage = (len(completed_tasks) / len(tasks) * 100) if tasks else 0

        return {
            "project_id": project_id,
            "project_name": project.get("name"),
            "brand": "tiny_sumo",
            "total_tasks": len(tasks),
            "completed_tasks": len(completed_tasks),
            "in_progress_tasks": len(in_progress_tasks),
            "pending_tasks": len(pending_tasks),
            "progress_percentage": round(progress_percentage, 1),
            "client_url": project.get("custom_fields", {}).get("client_url"),
            "last_updated": datetime.now().isoformat(),
            "tiny_sumo_specialties": {
                "seo_audit": len(
                    [
                        t
                        for t in tasks
                        if t.get("custom_fields", {}).get("task_type")
                        == TaskType.SEO_AUDIT.value
                    ]
                ),
                "social_audit": len(
                    [
                        t
                        for t in tasks
                        if t.get("custom_fields", {}).get("task_type")
                        == TaskType.SOCIAL_AUDIT.value
                    ]
                ),
                "technical_audit": len(
                    [
                        t
                        for t in tasks
                        if t.get("custom_fields", {}).get("task_type")
                        == TaskType.TECHNICAL_AUDIT.value
                    ]
                ),
                "content_analysis": len(
                    [
                        t
                        for t in tasks
                        if t.get("custom_fields", {}).get("task_type")
                        == TaskType.CONTENT_ANALYSIS.value
                    ]
                ),
                "strategy_report": len(
                    [
                        t
                        for t in tasks
                        if t.get("custom_fields", {}).get("task_type")
                        == TaskType.STRATEGY_REPORT.value
                    ]
                ),
            },
            "custom_tools_used": [
                task.get("custom_fields", {}).get("custom_tool")
                for task in tasks
                if task.get("custom_fields", {}).get("custom_tool")
            ],
        }

    # ANALYTICS AND REPORTING

    async def get_tiny_sumo_dashboard_data(self, project_id: str) -> Dict[str, Any]:
        """Get Tiny Sumo branded dashboard data"""
        progress = await self.get_project_progress_summary(project_id)
        project = await self.get_project(project_id)

        return {
            "project": project,
            "progress": progress,
            "brand": "tiny_sumo",
            "dashboard_config": {
                "primary_color": "#8b0000",
                "secondary_color": "#2d1b1b",
                "accent_color": "#a52a2a",
                "company": "Tiny Sumo Marketing",
                "tagline": "Tiny Sumo. Giant Growth",
            },
            "custom_widgets": [
                "revenue_tracking",
                "client_satisfaction",
                "task_completion_rate",
                "custom_tool_integration_status",
            ],
        }


# Example Custom Tool Classes
class AnalyticsCustomTool:
    """Example custom tool for analytics integration"""

    @staticmethod
    async def get_project_data(project_id: str) -> Dict[str, Any]:
        # This would connect to your actual analytics API
        return {
            "monthly_traffic": 45600,
            "conversion_rate": 3.2,
            "revenue": 12500,
            "top_pages": ["/services", "/about", "/contact"],
            "bounce_rate": 45.2,
        }


class CRMIntegrationTool:
    """Example custom tool for CRM integration"""

    @staticmethod
    async def get_project_data(project_id: str) -> Dict[str, Any]:
        # This would connect to your CRM system
        return {
            "active_leads": 12,
            "proposals_sent": 5,
            "conversion_rate": 18.5,
            "average_deal_size": 3500,
            "sales_pipeline_value": 42000,
        }


# Usage Example
async def main():
    """Example usage of Tiny Sumo Huly Client"""
    config = TinySumoConfig(
        api_key="your-api-key",
        oauth_client_id="your-oauth-client-id",
        custom_tools_enabled=True,
        sso_enabled=True,
    )

    async with TinySumoHulyClient(config) as client:
        # Register custom tools
        client.register_custom_tool("analytics", AnalyticsCustomTool)
        client.register_custom_tool("crm", CRMIntegrationTool)

        # Authenticate with SSO
        auth_result = await client.authenticate_with_sso("employee@tiny-sumo.com")
        print(f"Authenticated: {auth_result}")

        # Create Tiny Sumo project
        project = await client.create_tiny_sumo_project(
            client_url="https://example-client.com",
            project_type="comprehensive_audit",
            custom_tools=["analytics", "crm"],
        )

        print(f"Created project: {project['name']}")

        # Get project progress
        progress = await client.get_project_progress_summary(project["id"])
        print(f"Project progress: {progress['progress_percentage']}%")

        # Get dashboard data
        dashboard = await client.get_tiny_sumo_dashboard_data(project["id"])
        print(f"Dashboard ready for {dashboard['brand']}")


if __name__ == "__main__":
    asyncio.run(main())
