# Bedrock Sample Code

AWS Bedrock을 사용한 Claude AI 모델 테스트를 위한 TypeScript 샘플 프로젝트입니다.

## 🚀 빠른 시작

### 1. 프로젝트 설정
```bash
git clone <repository>
cd bedrock-test
npm install
```

### 2. AWS 설정

#### AWS CLI 설치 및 설정
```bash
# AWS CLI 설치 (Mac)
brew install awscli

# AWS CLI 설치 (Windows)
# https://aws.amazon.com/cli/ 에서 다운로드

# AWS Profile 설정
aws configure --profile your-profile-name
```

설정 시 입력 정보:
- **AWS Access Key ID**: IAM에서 발급받은 Access Key
- **AWS Secret Access Key**: IAM에서 발급받은 Secret Key
- **Default region name**: `ap-northeast-2` (서울)
- **Default output format**: `json`

### 3. Bedrock Access 요청 및 권한 설정

#### Bedrock 모델 액세스 요청
1. AWS 콘솔 → **Amazon Bedrock**
2. 왼쪽 메뉴 → **Model access**
3. **Anthropic** 모델들 활성화:
    - Claude 3 Haiku
    - Claude 3 Sonnet
    - Claude 3.5 Sonnet
    - 기타 원하는 모델들
4. **Submit** 버튼 클릭하여 액세스 요청

#### IAM 권한 설정
IAM 사용자에게 다음 정책 연결:
```json
{
   "Version": "2012-10-17",
   "Statement": [
      {
         "Sid": "BedrockBasicAccess",
         "Effect": "Allow",
         "Action": [
            "bedrock:InvokeModel",
            "bedrock:InvokeModelWithResponseStream",
            "bedrock:ListFoundationModels",
            "bedrock:GetFoundationModel"
         ],
         "Resource": "*"
      },
      {
         "Sid": "BedrockInferenceProfiles",
         "Effect": "Allow",
         "Action": [
            "bedrock:ListInferenceProfiles"
         ],
         "Resource": "*"
      }
   ]
}
```

또는 AWS 관리형 정책 **`AmazonBedrockFullAccess`** 사용

### 4. 환경 변수 설정

`.env` 파일 생성:
```bash
AWS_PROFILE="your-profile-name"

BEDROCK_MODEL_ID="anthropic.claude-3-haiku-20240307-v1:0"
```

#### 사용 가능한 모델 ID 예시:
- `anthropic.claude-3-haiku-20240307-v1:0` (빠르고 저렴)
- `anthropic.claude-3-sonnet-20240229-v1:0` (균형잡힌 성능)
- `anthropic.claude-3-5-sonnet-20240620-v1:0` (고성능)

### 5. 실행

```bash
npm run watch
```

## 📁 프로젝트 구조

```
bedrock-test/
├── src/
│   └── index.ts              # 메인 테스트 파일
├── .env                      # 환경 변수 (생성 필요)
├── .env.example             # 환경 변수 예시
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 사용 가능한 명령어

```bash
npm run dev      # 개발 모드 실행 (한 번만)
npm run watch    # Watch 모드 실행 (파일 변경 감지)
npm run build    # TypeScript 빌드
npm run start    # 빌드된 파일 실행
npm run clean    # 빌드 파일 정리
```

## 🛠️ 트러블슈팅

### AccessDeniedException 에러
- AWS 콘솔에서 Bedrock Model access 확인
- IAM 사용자 권한 확인
- AWS Profile 설정 확인

### ValidationException 에러
- 다른 모델 ID 시도
- 해당 리전에서 모델 지원 여부 확인

### 크리덴셜 에러
- `aws configure list --profile your-profile-name` 명령어로 설정 확인
- AWS Access Key 유효성 확인

## 📚 참고 자료

- [AWS Bedrock 공식 문서](https://docs.aws.amazon.com/bedrock/)
- [Anthropic Claude 모델 가이드](https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters-claude.html)
- [AWS CLI 설정 가이드](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-quickstart.html)