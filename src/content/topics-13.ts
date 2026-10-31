import type { Topic } from "./types";

export const topics13: Topic[] = [
  {
    "id": "13.1",
    "blockId": "13",
    "slug": "13-1",
    "title": "Cloud architecture and identity",
    "subtopics": [
      {
        "id": "13.1.1",
        "title": "Architecture",
        "concepts": "account/subscription/project, region, network, compute, object storage, serverless, shared responsibility",
        "reading": {
          "label": "AWS shared responsibility",
          "url": "https://aws.amazon.com/compliance/shared-responsibility-model/"
        },
        "video": {
          "label": "John Savill Azure Master Class: architecture/network/storage modules",
          "url": "https://github.com/johnthebrit/AzureMasterClass"
        }
      },
      {
        "id": "13.1.2",
        "title": "AWS IAM",
        "concepts": "principal, action/resource/condition, identity/resource policy, roles/trust, temporary credentials, boundaries",
        "reading": {
          "label": "AWS IAM user guide",
          "url": "https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html"
        },
        "video": {
          "label": "AWS: IAM Policy Language Explained",
          "url": "https://aws.amazon.com/video/watch/625f28e7a2e/"
        }
      },
      {
        "id": "13.1.3",
        "title": "Cross-cloud identity",
        "concepts": "Entra identity versus Azure RBAC, service principal/managed identity, GCP service account, federation",
        "reading": {
          "label": "Microsoft Entra fundamentals",
          "url": "https://learn.microsoft.com/en-us/entra/fundamentals/whatis"
        },
        "video": {
          "label": "Azure Master Class: identity module",
          "url": "https://github.com/johnthebrit/AzureMasterClass"
        }
      }
    ],
    "task": "create a fictional three-service architecture and six small IAM policy examples. Predict which requests are allowed or denied and why, including explicit deny and cross-account trust conditions. Review against the official evaluation rules; do not oversimplify every policy combination to a single union. Translate the same least-privilege intent into AWS, Azure, and GCP terminology."
  },
  {
    "id": "13.2",
    "blockId": "13",
    "slug": "13-2",
    "title": "Cloud assessment and logging",
    "subtopics": [
      {
        "id": "13.2.1",
        "title": "Exposure",
        "concepts": "storage access, public services, overly broad identity permissions, secrets, instance metadata and SSRF",
        "reading": {
          "label": "AWS IAM/security guidance",
          "url": "https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html"
        },
        "video": {
          "label": "AWS IAM policy video",
          "url": "https://aws.amazon.com/video/watch/625f28e7a2e/"
        }
      },
      {
        "id": "13.2.2",
        "title": "Access paths",
        "concepts": "role assumption, resource policies, workload credentials, federation trust, serverless permissions",
        "reading": {
          "label": "AWS policy evaluation",
          "url": "https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html"
        },
        "video": {
          "label": "AWS IAM video",
          "url": "https://aws.amazon.com/video/watch/625f28e7a2e/"
        }
      },
      {
        "id": "13.2.3",
        "title": "Visibility",
        "concepts": "audit events, identity/time/resource, management versus data activity, retention, remediation verification",
        "reading": {
          "label": "AWS CloudTrail documentation",
          "url": "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html"
        },
        "video": {
          "label": "Azure Master Class: Monitoring and Security",
          "url": "https://github.com/johnthebrit/AzureMasterClass"
        }
      }
    ],
    "task": "review a fictional policy bundle containing a public storage statement, broad role trust, and an unnecessarily powerful application role. Write corrected policies and positive/negative test cases. Analyze synthetic audit JSON and explain what evidence would prove a role change or data read. Optional: practice on provider-designated cloud challenges after checking account/cost requirements. Do not apply research techniques to arbitrary public buckets or other tenants."
  },
  {
    "id": "13.3",
    "blockId": "13",
    "slug": "13-3",
    "title": "Containers and Kubernetes",
    "subtopics": [
      {
        "id": "13.3.1",
        "title": "Containers",
        "concepts": "image/layer, container/process, registry, volume, network, user, capabilities, daemon socket",
        "reading": {
          "label": "Docker: getting started and security",
          "url": "https://docs.docker.com/get-started/"
        },
        "video": {
          "label": "Hacker101: Introduction to Docker Hacking",
          "url": "https://www.hacker101.com/sessions/docker_hacking"
        }
      },
      {
        "id": "13.3.2",
        "title": "Kubernetes",
        "concepts": "pod/deployment/service, namespace, service account, RBAC, secrets, admission, network policy",
        "reading": {
          "label": "Kubernetes: concepts and security",
          "url": "https://kubernetes.io/docs/concepts/security/"
        },
        "video": {
          "label": "CNCF: The ABCs of Kubernetes Security",
          "url": "https://www.cncf.io/online-programs/the-abcs-of-kubernetes-security/"
        }
      },
      {
        "id": "13.3.3",
        "title": "Assessment",
        "concepts": "privileged workload, host mount, exposed control plane, image provenance, secret handling, policy verification",
        "reading": {
          "label": "Kubernetes: security checklist",
          "url": "https://kubernetes.io/docs/concepts/security/security-checklist/"
        },
        "video": {
          "label": "CNCF: Kubernetes security foundations",
          "url": "https://www.cncf.io/online-programs/the-abcs-of-kubernetes-security/"
        }
      }
    ],
    "task": "containerize your notes app inside the lab. Remove a deliberately added root user, unnecessary capability, and embedded dummy secret; explain each change. On a small local [kind][KIND] cluster, create a narrowly scoped service account and prove permitted/denied actions. Review a dangerous pod manifest without running a host-compromise demonstration. If using network policies, verify the chosen network plugin actually enforces them."
  },
  {
    "id": "13.4",
    "blockId": "13",
    "slug": "13-4",
    "title": "CI/CD and software supply chains",
    "subtopics": [
      {
        "id": "13.4.1",
        "title": "Delivery",
        "concepts": "source, build, test, artifact, deployment, runner identity, branch/review boundaries",
        "reading": {
          "label": "GitHub Actions: security hardening",
          "url": "https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions"
        },
        "video": {
          "label": "CS50 Web: Testing and CI/CD",
          "url": "https://cs50.harvard.edu/web/"
        }
      },
      {
        "id": "13.4.2",
        "title": "Dependencies",
        "concepts": "lockfiles, transitive packages, known vulnerabilities, SBOM, pinning, artifact provenance",
        "reading": {
          "label": "OpenSSF: secure development fundamentals",
          "url": "https://lfd121.openssf.org/lfd121"
        },
        "video": {
          "label": "CNCF: Secure Software Factory, SBOM and code signing",
          "url": "https://www.cncf.io/online-programs/cncf-live-webinar-secure-software-factory-adding-sbom-and-code-signing-to-your-security-checks/"
        }
      },
      {
        "id": "13.4.3",
        "title": "Secrets/trust",
        "concepts": "untrusted contributions, workflow tokens, environment credentials, short-lived federation, least privilege",
        "reading": {
          "label": "GitHub Actions: secure use reference",
          "url": "https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions"
        },
        "video": {
          "label": "SpecterOps: free Software Supply Chain Security course",
          "url": "https://academy.specterops.io/software-supply-chain-security-for-red-teamers"
        }
      }
    ],
    "task": "design or run a local CI workflow that tests your app and produces an artifact. Review an intentionally flawed workflow file for excessive token permissions, untrusted input, exposed dummy secrets, and unpinned dependencies. Produce a threat model and corrected file. Do not submit malicious pull requests to real projects; the sample repository is yours."
  }
];
