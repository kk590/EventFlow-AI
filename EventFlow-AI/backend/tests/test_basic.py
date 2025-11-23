import pytest
import sys
import os

# Add the parent directory to the path to import app modules
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

def test_import_app():
    """Test that the app module can be imported"""
    try:
        import app
        assert True
    except ImportError as e:
        pytest.fail(f"Failed to import app: {e}")

def test_import_config_validator():
    """Test that the config_validator module can be imported"""
    try:
        from config_validator import ConfigValidator
        assert ConfigValidator is not None
    except ImportError as e:
        pytest.fail(f"Failed to import ConfigValidator: {e}")

def test_basic_sanity():
    """Basic sanity test to ensure pytest is working"""
    assert 1 + 1 == 2
    assert True is True
    assert "test" == "test"
